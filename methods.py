import numpy as np
import pandas as pd
import methods as mt
import datetime

def convert_date(str):
    """
    This method is used to convert a string into datetime.
    """
    arr = str.split("-")
    year = int(arr[0])
    month = int(arr[1])

    str = arr[2]
    arr = str.split()
    day = int(arr[0])
    date = datetime.datetime(year = year, month = month, day = day)
    return date
