import './index.scss';

// APP

const submitInput = document.querySelector('.submitInput');
const spinner = document.querySelector('.spinner');
const tableContainer = document.querySelector('.resultsContainer');
const startMessage = document.querySelector('.startMessage')
const err = document.querySelector('.error');
const textInput = document.querySelector('.textInput');


const showError = () => {
    err.classList.add('active')
};

const hideError = () => {
    err.classList.remove('active')
};

const showBasicMessage = () => {
    startMessage.classList.remove("inActive")
};

const hideBasicMessage = () => {
    startMessage.classList.add("inActive")
};

const showSpinner = () => {
    spinner.classList.add('active')
};

const hideSpinner = () => {
    spinner.classList.remove('active')
};

const getInputValue = () => {
    const textInput = document.querySelector('.textInput');
    return textInput.value
}

const showTable = () => {
    tableContainer.classList.add('active');
};

const hideTable = () => {
    tableContainer.classList.remove('active');
};

const getData = (e) => {
    e.preventDefault();
    hideError();
    showSpinner();

    const value = getInputValue();
    const page = '1';

    const options = {
        headers: {
            Authorization: 'Bearer ' + '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',
            Accept: 'application/vnd.github+json'
        }
    };

    const url = `https://api.github.com/search/repositories?q=${value}&page=${page}&per_page=10`;

    axios.get(url, options)
        .then((res) => {

            handleData(res.data.items);
            showTable();
            hideSpinner();
            hideBasicMessage();
        },)
        .catch((error) => {
            hideTable();
            showError();
            handleData(error);
            hideSpinner();
            hideBasicMessage()
        })
};

const modifyButton = (e) => {
    if (e.target.value.length > 0) {
        submitInput.disabled = false;
    } else submitInput.disabled = true;

};


submitInput.addEventListener('click', (e) => getData(e));
textInput.addEventListener('keyup', (e) => modifyButton(e));



const handleData = function (data) {
    console.log(data)
};

