from reportlab.lib.units import inch

# Excel data column setting
extract_col_name = 5 # column F
extract_col_start = 6 # column G
extract_col_end = 237 # column IC

# Source and Export data file directory
csv_file_path = 'assets/Canine SNP Parentage Example.csv'
pdf_file_path = 'outputs/DNA BLUE PRINT'


# Center text "TIM"
center_start_row = 22  # 0-indexed, so 22nd row is the 23rd row
center_start_col = 4  # 0-indexed, so 4th col is the 5th column

# Paper setting
frame_margin_x = 0.3 * inch  # 0.5 inch margin
frame_margin_y = 0.4 * inch  # 0.5 inch margin
page_content_width = 8 * inch
page_content_height = 4 * inch

# Dog name
center_text = "world"
