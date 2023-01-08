const uplaodBox = document.querySelector(".upload-box"),
previewImg = uplaodBox.querySelector("img"),
fileInput = uplaodBox.querySelector("input");

const loadFile = (e) => {
    const file = e.target.files[0]; // getting first user selected file
    if(!file) return; //return if user hasn't selected any file
    previewImg.scr = URL.createObjectURL(file); // passing selected file url to preview img src
    previewImg.addEventListener("load", () => {
        document.querySelector("wrapper").classList.add("active");
    })
    console.log(file);
}

fileInput.addEventListener("change", loadFile);
uplaodBox.addEventListener("click", () => fileInput.click());