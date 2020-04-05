// global variables
let pump_pred = []; //hold dataset of pumpkins prediction
let pump_test = []; //hold dataset of actual pumpkins test set
let pump_data = []; //hold dataset of pumpkins train set
let pump_date = []; //hold date list of pumpkins
let pump_pred_value = new Array(1000).fill(null);; //hold prediction of pumpkins
let pump_value = []; //hold actual values of pumpkins

let bana_pred = []; //hold dataset of bananas prediction
let bana_test = []; //hold dataset of actual bananas test set
let bana_data = []; //hold dataset of bananas train set
let bana_date = []; //hold date list of bananas
let bana_pred_value = new Array(1002).fill(null);; //hold prediction of bananas
let bana_value = []; //hold actual values of bananas

$(document).ready(function() {
    
     $.ajax({
        type: "GET",
        url: "data/Pumpkins data.csv",
        dataType: "text",
        success: function(data) {processData(data, pump_data, pump_date, pump_value);}
     });

     $.ajax({
        type: "GET",
        url: "predictions/Pumpkins lstm prediction.csv",
        dataType: "text",
        success: function(data) {processData(data, pump_pred, pump_date, pump_pred_value);}
     });

     $.ajax({
        type: "GET",
        url: "data/Pumpkins test.csv",
        dataType: "text",
        success: function(data) {processTest(data, pump_test, pump_value);}
     });
/*
     $.ajax({
        type: "GET",
        url: "data/Bananas data.csv",
        dataType: "text",
        success: function(data) {processData(data, bana_data, bana_date, bana_value);}
    });

     $.ajax({
        type: "GET",
        url: "predictions/Bananas lstm prediction.csv",
        dataType: "text",
        success: function(data) {processData(data, bana_pred, bana_date, bana_pred_value);}
     });

     $.ajax({
        type: "GET",
        url: "data/Bananas test.csv",
        dataType: "text",
        success: function(data) {processTest(data, bana_test, bana_value);}
     });
     */
});

function processData(allText, saveTo, date_ls, value_ls) {
    console.log('in data')
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }
    saveTo = lines;
    split_date_value(saveTo, date_ls);
    split_pred_value(saveTo, value_ls);
    //console.log(pump_pred_value)
};

function processTest(allText, saveTo, value_ls) {
    console.log('processtest')
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }
    saveTo = lines;
    split_test_value(saveTo, value_ls);

    //create charts
    //draw_bana_graph();
    draw_pump_graph();
};


//split functions
function split_date_value(dataset, ls) {
    for (const t of dataset) {
        cur_date = t[0].split(':')[1];
        ls.push(cur_date);
    }
};

function split_pred_value(dataset, ls) {
    for (const t of dataset) {
        cur_val = t[1].split(':')[1];
        ls.push(Number(cur_val));
    }
};

function split_test_value(dataset, ls) {
    for (const t of dataset) {
        cur_val = t[1].split(':')[1];
        ls.push(Number(cur_val));
    }
};


//draw the graph
function draw_pump_graph() {
    console.log(pump_date[1001])
    Highcharts.chart("pump_pred", {
        chart: {
            type: 'line',
            backgroundColor: '#f3f3f3'
        },

        xAxis: {
            title: {
                text: 'Date'
            },
            categories: pump_date.slice(890, 1276),
            minTickInterval: 70,
            tickWidth: 1,
            plotBands: [{
                color: 'rgba(239,255,143,1)', // Color value
                from: '109', // Start of the plot band
                to: '400' // End of the plot band
              }],
        },

        yAxis: {
            title: {
                text: 'Units',
                fontWeight: 'bold'
            }
        },
    
        title: {
            text: 'Pumpkins Prediction'
        },

        subtitle: {
            text: 'Prediction of units of pumpkins sold per day using LSTM.'
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            borderWidth: 1
        },
    
        series: [
            {name: 'Actual',
            data: pump_value.slice(890, 1276), 
            color: 'rgba(42,47,215,1)', 
            alpha: 0.4},
            {name: 'Prediction',
            data: pump_pred_value.slice(890, 1276),
            color: 'orange'}
        ]
    })
};

function draw_bana_graph() {
    console.log(bana_date[1001])
    Highcharts.chart("bana_pred", {
        chart: {
            type: 'line',
            backgroundColor: '#f3f3f3'
        },

        xAxis: {
            title: {
                text: 'Date'
            },
            categories: bana_date.slice(890, 1276),
            minTickInterval: 70,
            tickWidth: 1,
            plotBands: [{
                color: 'rgba(239,255,143,1)', // Color value
                from: '112', // Start of the plot band
                to: '400' // End of the plot band
              }],
        },

        yAxis: {
            title: {
                text: 'Units',
                fontWeight: 'bold'
            }
        },
    
        title: {
            text: 'Bananas Prediction'
        },

        subtitle: {
            text: 'Prediction of units of bananas sold per day using LSTM.'
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            borderWidth: 1
        },
    
        series: [
            {name: 'Actual',
            data: bana_value.slice(890, 1276), 
            color: 'rgba(42,47,215,1)', 
            alpha: 0.4},
            {name: 'Prediction',
            data: bana_pred_value.slice(890, 1276),
            color: 'orange'}
        ]
    })
};