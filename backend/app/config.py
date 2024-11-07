import os
from dotenv import load_dotenv

from reportlab.lib.units import inch
from reportlab.lib import colors

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')

class Constant:
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER')
    RESULT_FOLDER = os.environ.get('RESULT_FOLDER')
    FONT_FOLDER = os.environ.get('FONT_FOLDER')

    # Excel data column setting
    EXTRACT_COL_NAME = int(os.environ.get('EXTRACT_COL_NAME'))
    EXTRACT_COL_START = int(os.environ.get('EXTRACT_COL_START'))
    EXTRACT_COL_END = int(os.environ.get('EXTRACT_COL_END'))

    # Center text index e.g. "TIM"
    CENTER_START_ROW = int(os.environ.get('CENTER_START_ROW')) * inch
    CENTER_START_COL = int(os.environ.get('CENTER_START_COL')) * inch
    # Paper setting
    FRAME_MARGIN_X = int(float(os.environ.get('FRAME_MARGIN_X')) * inch)
    FRAME_MARGIN_Y = int(float(os.environ.get('FRAME_MARGIN_Y')) * inch)
    PAGE_CONTENT_WIDTH = int(os.environ.get('PAGE_CONTENT_WIDTH')) * inch
    PAGE_CONTENT_HEIGHT = int(os.environ.get('PAGE_CONTENT_HEIGHT')) * inch

    # Immutable color
    COLOR_TABLE_TEXT = colors.HexColor(os.environ.get('GREY_RGB'))
    COLOR_TABLE_GRID = colors.HexColor(os.environ.get('LIGHT_GREY_RGB'))

    # Mutable color variables for name text, background and table box
    COLOR_NAME_TEXT = colors.HexColor(0x7030A0) # PURPLE
    COLOR_NAME_BG = COLOR_MAME_GRID = COLOR_TABLE_BOX = colors.HexColor(0xC0B9EF) # LIGHT_PURPLE

    @classmethod
    def update_name_colors(cls, color_name_text, color_name_bg):
        cls.COLOR_NAME_TEXT = colors.HexColor(color_name_text)
        cls.COLOR_NAME_BG = cls.COLOR_NAME_GRID = cls.COLOR_TABLE_BOX= colors.HexColor(color_name_bg)

    @classmethod
    def update_table_colors(cls, color_table_grid, color_table_text):
        cls.COLOR_TABLE_GRID = colors.HexColor(color_table_grid)
        cls.COLOR_TABLE_TEXT = colors.HexColor(color_table_text)
