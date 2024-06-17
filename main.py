import pandas as pd
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Frame, PageTemplate
from reportlab.lib import colors
# from reportlab.lib.colors import red, green

extract_col_start = 5 # column F
extract_col_end = 236 # column IB

csv_file_path = 'assets/Canine SNP Parentage Example.csv'
pdf_file_path = 'outputs/DNA BLUE PRINT'

def generate_pdf_file_path (page_index):
    return f"{pdf_file_path} {page_index}.pdf"

def process_csv_and_export_pdf():
    # Read the CSV file
    data = pd.read_csv(csv_file_path)

    # Extract the columns from F to IB
    data_points = data.iloc[:, extract_col_start: extract_col_end]

    # Reorder data points and flag discrepancies
    for index, row in data_points.iterrows():
        reordered_row = []
        for value in row.values:
            if value != 'NR':
                reordered_row.extend(value.split('/'))
        generate_pdf(reordered_row, index)

def generate_pdf(blue_print_table_data, page_index):
    # Center text "TIM"
    center_text = "TIM"
    center_start_row = 22  # 0-indexed, so 22nd row is the 23rd row
    center_start_col = 4  # 0-indexed, so 4th col is the 5th column

    # Create the PDF
    frame_margin_x = 0.3 * inch  # 0.5 inch margin
    frame_margin_y = 0.4 * inch  # 0.5 inch margin
    page_content_width = 8 * inch
    page_content_height = 4 * inch
    page_width = page_content_width + 2 * frame_margin_x
    page_height = page_content_height + 2 * frame_margin_y
    doc = SimpleDocTemplate(generate_pdf_file_path(page_index), pagesize=(page_width, page_height))  # 8x4 inches in points

    # Define the styles
    centered = ParagraphStyle(name="Centered", alignment=1, fontSize=12, leading=12, textColor=colors.blue, fontName="Helvetica-Bold")

    # Create table data
    table_data = []
    data_index = 0

    for row in range(10):
        row_data = []
        for col in range(46):
            if (center_start_row <= row < center_start_row + 2) and (center_start_col <= col < center_start_col + 3):
                if row == center_start_row and col == center_start_col:
                    row_data.append(Paragraph(center_text, centered))
                else:
                    row_data.append('')
            else:
                row_data.append(blue_print_table_data[data_index])
                data_index += 1
        table_data.append(row_data)

    # Create the table
    table = Table(table_data, colWidths=[8 * inch / 46] * 46, rowHeights=[8 * inch / 46] * 10)  # 0.8 inches per column, 0.5 inches per row

    # Style the table
    table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.black),

        ('TEXTCOLOR', (0, 0), (0, 9), colors.purple),  # Example: Specific cell text color
        ('FONTNAME', (0, 0), (0, 9), 'Helvetica-Bold'),  # Example: Specific cell font
        
        ('TEXTCOLOR', (45, 45), (0, 9), colors.purple),  # Example: Specific cell text color
        ('FONTNAME', (45, 45), (0, 9), 'Helvetica-Bold')  # Example: Specific cell font
    ]))

    # Define the frame with margins

    frame = Frame(x1=0, y1=0, width=page_width, height=page_height, leftPadding=frame_margin_x, rightPadding=frame_margin_x, topPadding=frame_margin_y)

    # Create a PageTemplate and add the frame to it
    page_template = PageTemplate(id='PageTemplate', frames=[frame])

    # Build the PDF
    doc.addPageTemplates([page_template])

    # Build the PDF
    doc.build([table])

    print(f"PDF created successfully: {generate_pdf_file_path(page_index)}")

process_csv_and_export_pdf()
