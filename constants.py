from reportlab.lib.units import inch
from reportlab.lib import colors

# Excel data column setting
extract_col_name = 5 # column F
extract_col_start = 6 # column G
extract_col_end = 237 # column IC

# Source and Export data file directory
csv_file_path = 'assets/genertic CSV'
pdf_file_path = 'outputs/DNA BLUE PRINT'


# Center text "TIM"
center_start_row = 22  # 0-indexed, so 22nd row is the 23rd row
center_start_col = 4  # 0-indexed, so 4th col is the 5th column

# Paper setting
frame_margin_x = 0.3 * inch  # 0.5 inch margin
frame_margin_y = 0.4 * inch  # 0.5 inch margin
page_content_width = 8 * inch
page_content_height = 4 * inch

# Immutable color
grey = colors.HexColor(0xBFBFBF)
light_grey = colors.HexColor(0xD9D9D9)

# Color templates
purple = colors.HexColor(0x7030A0)
light_purple = colors.HexColor(0xC0B9EF)

brown = colors.HexColor(0xC65911)
light_brown = colors.HexColor(0xF8CBAD)

sky = colors.HexColor(0x2F75B5)
light_sky = colors.HexColor(0xBDD7EE)

yellow = colors.HexColor(0xBF8F00)
light_yellow = colors.HexColor(0xFFE699)

green = colors.HexColor(0x548235)
light_green = colors.HexColor(0xC6E0B4)


# Mutable color variables for name text, background and table box
color_name_text = green
color_name_bg = color_name_grid = color_table_box = light_green
