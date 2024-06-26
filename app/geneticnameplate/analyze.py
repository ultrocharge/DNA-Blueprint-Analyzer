import pandas as pd, os, json, zipfile

from io import BytesIO

from flask import send_file

from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Frame, PageTemplate
from reportlab.lib.styles import getSampleStyleSheet

from app.config import Constant

current_dir = os.path.dirname(os.path.abspath(__file__))
alphabets_file_path = os.path.join(current_dir, '..', 'assets', 'alphabets.json')
uploads_file_path = os.path.join(current_dir, '..', Constant.UPLOAD_FOLDER)
outputs_file_path = os.path.join(current_dir, '..', Constant.RESULT_FOLDER)

if not os.path.exists(uploads_file_path):
    os.makedirs(uploads_file_path)

if not os.path.exists(outputs_file_path):
    os.makedirs(outputs_file_path)

roboto_file_path = os.path.join(current_dir, '..', Constant.FONT_FOLDER, 'Roboto-Regular.ttf')
roboto_bold_file_path = os.path.join(current_dir, '..', Constant.FONT_FOLDER, 'Roboto-Bold.ttf')

with open(alphabets_file_path, 'r') as f:
    alphabets = json.load(f)

# Register the font
pdfmetrics.registerFont(TTFont('Roboto', roboto_file_path))
pdfmetrics.registerFont(TTFont('Roboto-Bold', roboto_bold_file_path))

def generate_pdf_file_path (page_index, dog_name):
    return f"{outputs_file_path}/DNA BLUE PRINT {page_index} - {dog_name[page_index]}.pdf"

def generate_text(table, text, row_len, text_len):
    paddingL = int((row_len - text_len * 5)/(3 + text_len))
    paddingM = int((row_len - text_len * 3)/(3 + text_len))

    # Letter starting point
    xL = int((row_len - 5 * text_len - paddingL * (text_len - 1))/2)
    xM = int((row_len - 3 * text_len - paddingM * (text_len - 1))/2)
    yL = 2
    yM = 3
    cnt = 1

    # Table style
    table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME',(0, 0),(-1,-1),'Roboto'),
        ('TEXTCOLOR',(0,0),(-1,-1), Constant.GREY),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.1, Constant.LIGHT_GREY),
        ('BOX', (0, 0), (-1, -1), 0.1, Constant.COLOR_TABLE_BOX),
    ]))

    for t in list(text.upper()):
        alphabet = alphabets[t]
        alphabet_size = {}
        if text_len > 6:
            alphabet_size = alphabet['medium']

            for i in alphabet_size['coords']: 
                table.setStyle(TableStyle([
                    ('TEXTCOLOR', (xM + i['sc'], yM + i['sr']),(xM + i['ec'], yM + i['er']), Constant.COLOR_NAME_TEXT),
                    ('FONTNAME', (xM + i['sc'], yM + i['sr']),(xM + i['ec'], yM + i['er']), 'Roboto-Bold'),
                    ('GRID', (xM + i['sc'],yM + i['sr']),(xM + i['ec'],yM + i['er']), 0, Constant.COLOR_MAME_GRID),
                    ('BACKGROUND', (xM + i['sc'], yM + i['sr']),(xM + i['ec'], yM + i['er']), Constant.COLOR_NAME_BG)
            ]))    
            xM = xM + alphabet_size['meta']['cellWidth'] + paddingM
            cnt = cnt + 1
        else:
            alphabet_size = alphabet['large']
        
            for i in alphabet_size['coords']: 
                table.setStyle(TableStyle([
                    ('TEXTCOLOR', (xL + i['sc'], yL + i['sr']),(xL + i['ec'], yL + i['er']), Constant.COLOR_NAME_TEXT),
                    ('FONTNAME', (xL + i['sc'], yL + i['sr']),(xL + i['ec'], yL + i['er']), 'Roboto-Bold'),
                    ('GRID', (xL + i['sc'],yL + i['sr']),(xL + i['ec'],yL + i['er']), 0, Constant.COLOR_MAME_GRID),
                    ('BACKGROUND', (xL + i['sc'], yL + i['sr']),(xL + i['ec'], yL + i['er']), Constant.COLOR_NAME_BG)
            ]))    
            xL = xL + alphabet_size['meta']['cellWidth'] + paddingL
            cnt = cnt + 1

def generate_pdf(blue_print_table_data, dog_name, page_index, pdf_buffer):

    page_width = Constant.PAGE_CONTENT_WIDTH + 2 * Constant.FRAME_MARGIN_X
    page_height = Constant.PAGE_CONTENT_HEIGHT + 2 * Constant.FRAME_MARGIN_Y
    
    # Create PDF (8 * 4 inches)
    doc = SimpleDocTemplate(outputs_file_path, pagesize=(page_width, page_height))
    # doc = SimpleDocTemplate(pdf_buffer, pagesize=(page_width, page_height))

    # Create table data
    table_data = []
    data_index = 0

    for row in range(10):
        row_data = []
        for col in range(46):
            if (Constant.CENTER_START_ROW <= row < Constant.CENTER_START_ROW + 2) and (Constant.CENTER_START_COL <= col < Constant.CENTER_START_COL + 3):
                if row == Constant.CENTER_START_ROW and col == Constant.CENTER_START_COL:
                    row_data.append(Paragraph(dog_name[page_index]))
                else:
                    row_data.append('')
            else:
                row_data.append(blue_print_table_data[data_index])
                data_index += 1
        table_data.append(row_data)

    # Length of row and text
    row_len = len(row_data)
    text_len = len(dog_name[page_index])

    # Create table
    table = Table(table_data, colWidths=[Constant.PAGE_CONTENT_WIDTH / 46] * 46, rowHeights=[Constant.PAGE_CONTENT_WIDTH / 46] * 10)
    
    generate_text(table, dog_name[page_index], row_len, text_len)

    # Define frame with margins
    frame = Frame(x1=0, y1=0, width=page_width, height=page_height, leftPadding=Constant.FRAME_MARGIN_X, rightPadding=Constant.FRAME_MARGIN_X, topPadding=Constant.FRAME_MARGIN_Y)

    # Create a PageTemplate and add the frame to it
    page_template = PageTemplate(id='PageTemplate', frames=[frame])
    doc.addPageTemplates([page_template])

    # Build PDF
    # doc.build([table])
    
    return doc


def process_csv_and_export_pdf(files, pdfInfo):

    Constant.update_name_colors(color_name_text=pdfInfo.get('textColor'), color_name_bg=pdfInfo.get('textBackgroundColor'))

    # Read the CSV file
    dataframes = []
    for file in files:
        df = pd.read_csv(file)
        dataframes.append(df)

    combined_df = pd.concat(dataframes, ignore_index=True)
    # Extract the columns from G to IC
    data_points = combined_df.iloc[:, Constant.EXTRACT_COL_START: Constant.EXTRACT_COL_END]

    # Extract the dog name
    dog_name = []

    selected_data = combined_df.iloc[:, Constant.EXTRACT_COL_NAME: Constant.EXTRACT_COL_NAME + 1]
    
    for index, row in selected_data.iterrows():
        dog_name.extend(row.values)

    # Create a zip file in memory
    zip_buffer = BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        # Reorder data points and flag discrepancies
        for index, row in data_points.iterrows():
            reordered_row = []
            for value in row.values:
                if value != 'NR':
                    reordered_row.extend(value.split('/'))

            # Example PDF generation (replace with your actual PDF generation logic)
            pdf_buffer = BytesIO()
            doc = generate_pdf(reordered_row, dog_name, index, pdf_buffer)
            styles = getSampleStyleSheet()
            flowables = [
                Paragraph(f"Title: Test", styles['Title']),
            ]
            doc.build(flowables)

            pdf_buffer.seek(0)
            zip_file.writestr(f"generated_document_{index + 1}.pdf", pdf_buffer.read())

    zip_buffer.seek(0)

    return send_file(zip_buffer, as_attachment=True, download_name='generated_reports.zip', mimetype='application/zip')