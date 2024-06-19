import pandas as pd
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Frame, PageTemplate
from reportlab.lib import colors
import json
import constants as CONSTANTS

f = open('alphabets.json')
alphabets = json.load(f)

# Register the font
pdfmetrics.registerFont(TTFont('Roboto', 'assets/fonts/Roboto-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Roboto-Bold', 'assets/fonts/Roboto-Bold.ttf'))

def generate_pdf_file_path (page_index):
    return f"{CONSTANTS.pdf_file_path} {page_index} - {CONSTANTS.center_text}.pdf"

def process_csv_and_export_pdf():
    # Read the CSV file
    data = pd.read_csv(CONSTANTS.csv_file_path)

    # Extract the columns from F to IB
    data_points = data.iloc[:, CONSTANTS.extract_col_start: CONSTANTS.extract_col_end]

    # Reorder data points and flag discrepancies
    for index, row in data_points.iterrows():
        reordered_row = []
        for value in row.values:
            if value != 'NR':
                reordered_row.extend(value.split('/'))
        generate_pdf(reordered_row, index)
    
def generate_pdf(blue_print_table_data, page_index):

    page_width = CONSTANTS.page_content_width + 2 * CONSTANTS.frame_margin_x
    page_height = CONSTANTS.page_content_height + 2 * CONSTANTS.frame_margin_y
    
    # Create PDF (8 * 4 inches)
    doc = SimpleDocTemplate(generate_pdf_file_path(page_index), pagesize=(page_width, page_height))

    # Define styles
    centered = ParagraphStyle(name="Centered", alignment=1, fontSize=8, leading=12, textColor=colors.blue, fontName="Helvetica-Bold")

    # Create table data
    table_data = []
    data_index = 0

    for row in range(10):
        row_data = []
        for col in range(46):
            if (CONSTANTS.center_start_row <= row < CONSTANTS.center_start_row + 2) and (CONSTANTS.center_start_col <= col < CONSTANTS.center_start_col + 3):
                if row == CONSTANTS.center_start_row and col == CONSTANTS.center_start_col:
                    row_data.append(Paragraph(CONSTANTS.center_text, centered))
                else:
                    row_data.append('')
            else:
                row_data.append(blue_print_table_data[data_index])
                data_index += 1
        table_data.append(row_data)

    # Length of row and text
    row_len = len(row_data)
    text_len = len(CONSTANTS.center_text)

    # Create table
    table = Table(table_data, colWidths=[CONSTANTS.page_content_width / 46] * 46, rowHeights=[CONSTANTS.page_content_width / 46] * 10)
    
    generate_text(table, CONSTANTS.center_text, row_len, text_len)

    # Define frame with margins
    frame = Frame(x1=0, y1=0, width=page_width, height=page_height, leftPadding=CONSTANTS.frame_margin_x, rightPadding=CONSTANTS.frame_margin_x, topPadding=CONSTANTS.frame_margin_y)

    # Create a PageTemplate and add the frame to it
    page_template = PageTemplate(id='PageTemplate', frames=[frame])
    doc.addPageTemplates([page_template])

    # Build PDF
    doc.build([table])

    print(f"PDF created successfully: {generate_pdf_file_path(page_index)}")

def generate_text(table, text, row_len, text_len):
    paddingL = int((row_len - text_len * 5)/(3 + text_len))
    paddingM = int((row_len - text_len * 3)/(3 + text_len))

    # Letter starting point
    xL = int((row_len - 5 * text_len - paddingL * (text_len - 1))/2)
    xM = int((row_len - 3 * text_len - paddingM * (text_len - 1))/2)
    y = 2
    cnt = 1

    # Table style
    table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME',(0,0),(-1,-1),'Roboto-Bold'),
        ('TEXTCOLOR',(0,0),(-1,-1), colors.purple),
        ('FONTNAME',(1,1),(-2,-2),'Roboto'),
        ('TEXTCOLOR',(1,1),(-2,-2), colors.lightgrey),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.lightgrey),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.black),
    ]))

    for t in list(text.upper()):
        alphabet = alphabets[t]
        alphabet_size = {}
        if text_len > 6:
            alphabet_size = alphabet['medium']

            for i in alphabet_size['coords']: 
                table.setStyle(TableStyle([
                    ('TEXTCOLOR',(xM + i['sc'], y + i['sr']),(xM + i['ec'], y + i['er']), colors.purple),
                    ('FONTNAME',(xM + i['sc'], y + i['sr']),(xM + i['ec'], y + i['er']), 'Helvetica-Bold'),
            ]))    
            xM = xM + alphabet_size['meta']['cellWidth'] + paddingM
            cnt = cnt + 1
        else:
            alphabet_size = alphabet['large']
        
            for i in alphabet_size['coords']: 
                table.setStyle(TableStyle([
                    ('TEXTCOLOR',(xL + i['sc'], y + i['sr']),(xL + i['ec'], y + i['er']), colors.purple),
                    ('FONTNAME',(xL + i['sc'], y + i['sr']),(xL + i['ec'], y + i['er']), 'Helvetica-Bold'),
            ]))    
            xL = xL + alphabet_size['meta']['cellWidth'] + paddingL
            cnt = cnt + 1
        
process_csv_and_export_pdf()
