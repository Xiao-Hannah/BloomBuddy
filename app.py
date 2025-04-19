
import streamlit as st

# Set page config
st.set_page_config(
    page_title="Bloom Buddy",
    page_icon="🌸",
    layout="wide"
)

# Title
st.title("Bloom Buddy")

#Subheader
st.subheader("Welcome to Bloom Buddy! This app is designed to help you manage your plants and flowers.")
st.write("To get started, please select a category from the sidebar.")

# Sidebar
with st.sidebar:
    st.header("Bloom Buddy")
    st.subheader("New Bloom")

# Overview Section
st.header("Overview")

with st.container(border=True):
    overview_col1, overview_col2 = st.columns(2)
    with overview_col1:
        st.write("This is the overview section.")
    with overview_col2:
        st.write("This is the overview section.")


# Style Section
st.header("Style")

with st.container(border=True):
    style_tab1, style_tab2, style_tab3 = st.tabs(["Color", "Font", "Image"])
    with style_tab1:
        color_col1, color_col2 = st.columns(2)
        with color_col1:
            st.write("This is the color section.")
        with color_col2:
            st.write("This is the color section.")
    with style_tab2:
        font_col1, font_col2, font_col3 = st.columns(3)
        with font_col1:
            st.write("This is the font section.")
        with font_col2:
            st.write("This is the font section.")
        with font_col3:
            st.write("This is the font section.")
    with style_tab3:
        st.write("This is the style section.")

# Content Section
