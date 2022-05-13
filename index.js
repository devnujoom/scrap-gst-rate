console.log("Creating....")

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const converter = require('json-2-csv');

const url = "https://cbic-gst.gov.in/gst-goods-services-rates.html";


async function scrapGST()
{
try{
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  //console.log($.html());
const report = $("body table tbody tr");
//console.log(report.html());

const gstdatas = [];

report.each(
  (i,el) => {
//tds = td.text();
//gstdatas.push($(tr).text());
//const code = $(el).find("td:eq(2)").text();
/*
if(code != "")
{
  */

/*
const getData = {schedules:"",sno:"",code:"",description:"",cgst:"",sgst:"",igst:""};
getData.schedules =$(el).find("td:eq(0)").text();
getData.sno =$(el).find("td:eq(1)").text();
getData.code =$(el).find("td:eq(2)").text();
getData.description = $(el).find("td:eq(3)").text();
getData.cgst =$(el).find("td:eq(4)").text();
getData.sgst = $(el).find("td:eq(5)").text();
getData.igst =$(el).find("td:eq(6)").text();
*/

/*
}
*/
if($(el).find("td:eq(2)").text()!=' ' || $(el).find("td:eq(4)").text()!=' ' || $(el).find("td:eq(5)").text()!=' ' || $(el).find("td:eq(6)").text()!=' '
|| $(el).find("td:eq(2)").text()!='AnyChapter' ||  $(el).find("td:eq(2)").text()!='0' || $(el).find("td:eq(4)").text()!='Nil')
{
const getData = {code:"",cgst:"",sgst:"",igst:""};
getData.code =$(el).find("td:eq(2)").text();
getData.cgst =$(el).find("td:eq(4)").text();
getData.sgst = $(el).find("td:eq(5)").text();
getData.igst =$(el).find("td:eq(6)").text();

gstdatas.push(getData);
}


});


  console.log(gstdatas);

  converter.json2csv(gstdatas, (err, csv) => {
      if (err) {
          throw err;
      }

      // print CSV string
      //console.log(csv);
      fs.writeFileSync("gstdatasfinal8.csv",csv);
  });

 console.log("--------------------------------Completed creation-------------------");
}
catch(err){
console.error(err);
}
  }

scrapGST();
