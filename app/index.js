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

const allFirstColumnTds = [...document.querySelectorAll('td:nth-child(1)')];
const allSecondColumnTds = [...document.querySelectorAll('td:nth-child(2)')];
const allThirdColumnTds = [...document.querySelectorAll('td:nth-child(3)')];
const allFourthColumnTds = [...document.querySelectorAll('td:nth-child(4)')];



const handleData = function (data) {
    console.log(data)
    allFirstColumnTds.forEach((td, index) => td.textContent = data[index].name)
    allSecondColumnTds.forEach((td, index) => td.textContent = data[index].owner.login)
    allThirdColumnTds.forEach((td, index) => td.textContent = data[index].stargazers_count)
    allFourthColumnTds.forEach((td, index) => {
        td.textContent = converYearFromJson(data[index].created_at)
    })
}


const converYearFromJson = (isoData) => {
    const dates = new Date(isoData)
    const year = dates.getFullYear()
    const month = dates.toLocaleDateString('en-US', { month: '2-digit' })
    const day = dates.getDate() < 10 ? '0' + dates.getDate() : dates.getDate()
    const hours = dates.getHours() < 10 ? '0' + dates.getHours() : dates.getHours()
    const minutes = dates.getMinutes() < 10 ? '0' + dates.getMinutes() : dates.getMinutes()
    return `${year}-${month}-${day} ${hours}:${minutes}`
}