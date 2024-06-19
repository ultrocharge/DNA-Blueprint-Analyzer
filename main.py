import pandas as pd
import os
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Frame, PageTemplate
from reportlab.lib import colors
import json
import constants as CONSTANTS

f = open('alphabets.json')
alphabets = json.load(f)

# Register the font
pdfmetrics.registerFont(TTFont('Roboto', 'assets/fonts/Roboto-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Roboto-Bold', 'assets/fonts/Roboto-Bold.ttf'))

def generate_pdf_file_path (page_index, dog_name):
    return f"{CONSTANTS.pdf_file_path} {page_index} - {dog_name[page_index]}.pdf"

def process_csv_and_export_pdf():
    # Read the CSV file

    all_files = os.listdir(CONSTANTS.csv_file_path)

    dataframes = []
    for file in all_files:
        if file.endswith('.csv'):
            df = pd.read_csv(os.path.join(CONSTANTS.csv_file_path, file))
            dataframes.append(df)

    combined_df = pd.concat(dataframes, ignore_index=True)
    # Extract the columns from G to IC
    data_points = combined_df.iloc[:, CONSTANTS.extract_col_start: CONSTANTS.extract_col_end]

    # Extract the dog name
    dog_name = []

    selected_data = combined_df.iloc[:, CONSTANTS.extract_col_name: CONSTANTS.extract_col_name+1]
    
    for index, row in selected_data.iterrows():
        dog_name.extend(row.values)
    # Reorder data points and flag discrepancies
    for index, row in data_points.iterrows():
        reordered_row = []
        for value in row.values:
            if value != 'NR':
                reordered_row.extend(value.split('/'))
        generate_pdf(reordered_row, dog_name, index)
    
def generate_pdf(blue_print_table_data, dog_name, page_index):

    page_width = CONSTANTS.page_content_width + 2 * CONSTANTS.frame_margin_x
    page_height = CONSTANTS.page_content_height + 2 * CONSTANTS.frame_margin_y
    
    # Create PDF (8 * 4 inches)
    doc = SimpleDocTemplate(generate_pdf_file_path(page_index, dog_name), pagesize=(page_width, page_height))

    # Create table data
    table_data = []
    data_index = 0

    for row in range(10):
        row_data = []
        for col in range(46):
            if (CONSTANTS.center_start_row <= row < CONSTANTS.center_start_row + 2) and (CONSTANTS.center_start_col <= col < CONSTANTS.center_start_col + 3):
                if row == CONSTANTS.center_start_row and col == CONSTANTS.center_start_col:
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
    table = Table(table_data, colWidths=[CONSTANTS.page_content_width / 46] * 46, rowHeights=[CONSTANTS.page_content_width / 46] * 10)
    
    generate_text(table, dog_name[page_index], row_len, text_len)

    # Define frame with margins
    frame = Frame(x1=0, y1=0, width=page_width, height=page_height, leftPadding=CONSTANTS.frame_margin_x, rightPadding=CONSTANTS.frame_margin_x, topPadding=CONSTANTS.frame_margin_y)

    # Create a PageTemplate and add the frame to it
    page_template = PageTemplate(id='PageTemplate', frames=[frame])
    doc.addPageTemplates([page_template])

    # Build PDF
    doc.build([table])

    print(f"PDF created successfully: {generate_pdf_file_path(page_index, dog_name)}")

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
        ('TEXTCOLOR',(0,0),(-1,-1), CONSTANTS.grey),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.1, CONSTANTS.light_grey),
        ('BOX', (0, 0), (-1, -1), 0.1, CONSTANTS.color_table_box),
    ]))

    for t in list(text.upper()):
        alphabet = alphabets[t]
        alphabet_size = {}
        if text_len > 6:
            alphabet_size = alphabet['medium']

            for i in alphabet_size['coords']: 
                table.setStyle(TableStyle([
                    ('TEXTCOLOR', (xM + i['sc'], yM + i['sr']),(xM + i['ec'], yM + i['er']), CONSTANTS.color_name_text),
                    ('FONTNAME', (xM + i['sc'], yM + i['sr']),(xM + i['ec'], yM + i['er']), 'Roboto-Bold'),
                    ('GRID', (xM + i['sc'],yM + i['sr']),(xM + i['ec'],yM + i['er']), 0, CONSTANTS.color_name_grid),
                    ('BACKGROUND', (xM + i['sc'], yM + i['sr']),(xM + i['ec'], yM + i['er']), CONSTANTS.color_name_bg)
            ]))    
            xM = xM + alphabet_size['meta']['cellWidth'] + paddingM
            cnt = cnt + 1
        else:
            alphabet_size = alphabet['large']
        
            for i in alphabet_size['coords']: 
                table.setStyle(TableStyle([
                    ('TEXTCOLOR', (xL + i['sc'], yL + i['sr']),(xL + i['ec'], yL + i['er']), CONSTANTS.color_name_text),
                    ('FONTNAME', (xL + i['sc'], yL + i['sr']),(xL + i['ec'], yL + i['er']), 'Roboto-Bold'),
                    ('GRID', (xL + i['sc'],yL + i['sr']),(xL + i['ec'],yL + i['er']), 0, CONSTANTS.color_name_grid),
                    ('BACKGROUND', (xL + i['sc'], yL + i['sr']),(xL + i['ec'], yL + i['er']), CONSTANTS.color_name_bg)
            ]))    
            xL = xL + alphabet_size['meta']['cellWidth'] + paddingL
            cnt = cnt + 1
        
process_csv_and_export_pdf()
