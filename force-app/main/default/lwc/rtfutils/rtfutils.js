export function exportCSVFile(headers,totalData,fileTitle){
    if(!totalData|| !totalData.length){
        return null;
    }

    const jsonObject=JSON.stringify(totalData);

    const result=convertToCSV(jsonObject,headers);

    if(!result){
        return null
    }
    console.log(result);
    const blob = new Blob([result], { type: 'text/csv' });

    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, fileTitle || 'export.csv');
    } else {
        const encodedData = encodeURIComponent(result);
        const dataUri = 'data:text/csv;charset=utf-8,' + encodedData;

        // Create an anchor element
        const link = document.createElement('a');
        link.href = dataUri;
        link.download = fileTitle || 'export.csv';
        link.style.display = 'none';

        // Append the anchor to the body and simulate a click
        document.body.appendChild(link);
        link.click();

        // Remove the anchor after the click event
        document.body.removeChild(link);
    }

}

function convertToCSV(objArry,headers){
    const columnDelimeter=',';
    const lineDelimeter='\r\n';
    const actualHeaderKey=Object.keys(headers);
    const headerToShow=Object.values(headers);

    let str=''

    str+=headerToShow.join(columnDelimeter)
    str+=lineDelimeter

    const data= typeof objArry !=='object' ? JSON.parse(objArry):objArry
    data.forEach(obj => {
        let line=''
        actualHeaderKey.forEach(key=>{
            if(line!=''){
                line+=columnDelimeter
            }
            let strItem=''
            if(obj[key]!== undefined){
                strItem= obj[key]+''
            }
            else{
                strItem= '-'+''
            }
            
            line+=strItem? strItem.replace(/,/g,''):strItem
        })
        str+=line+lineDelimeter
    });

    return str;
}