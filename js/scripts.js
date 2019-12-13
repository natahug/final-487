var femaleCount = 0;
var maleCount = 0;
var footfall = 0;
var baseball = 0;
var soccer = 0;
var unknown = 0;
var basketball = 0;

$( document ).ready(function() {
    loadData();
    loadData2();
   
});



function loadData(){

    $.ajax({
            type:"GET",
            url:" https://www.googleapis.com/download/storage/v1/b/teaching-api/o/people.json?generation=1576123202877101&alt=media",
            dataType:"json",
            success: parseData
});
}
function loadData2(){

  $.ajax({
          type:"GET",
          url:" https://www.googleapis.com/download/storage/v1/b/teaching-api/o/photos.json?generation=1576123660992318&alt=media",
          dataType:"json",
          success: parseData2
});

}
function parseData(data){
    console.log(data);
    var htmlBuilder = "";
    var htmlBuilder3 = "";
    
    for (var i = 0; i <data.length; i++){
        var name = data[i].name;
        var company = data[i].company;
        var email = data[i].email;
        var gender = data[i].gender;
        if (data[i]["gender"] == "male") {
          maleCount++;
      }else{
          femaleCount++;
      }
        var sport = data[i].favoriteSport;

        if (data[i]["favoriteSport"] == "Basketball") {
          basketball++;
      }
      if (data[i]["favoriteSport"] == "Football") {
        footfall++;
      }
      if (data[i]["favoriteSport"] == "Soceer") {
        soccer++;
      }
      if (data[i]["favoriteSport"] == "unknown") {
        unknown++;
      }
      if (data[i]["favoriteSport"] == "Baseball") {
        baseball++;
      }
        var about = data[i].about;
        var photo = data[i].picture;
        

        htmlBuilder += '<div class = "dataDivs"><img src="'+photo+'"></img>'
        htmlBuilder += '<p class = "usernames" >Name: '+ name+'<br></p>'
        htmlBuilder += '<p class = "at">Company: '+ company+'</p>'
        htmlBuilder += '<p class = "at">Gender: '+ gender+'</p>'
        htmlBuilder += '<p class = "at">Favorite Sport: '+ sport+'</p>'
        htmlBuilder += '<p class = "at">About: '+ about+'</p>'
        htmlBuilder += '<p class = "tweets">Email: '+ email+'</p></div>'
    }

    $('#test').html(htmlBuilder);
console.log(femaleCount);
console.log(maleCount);
var men = (maleCount/6)* 100;
var women = Math.round((femaleCount/6) *100);
htmlBuilder3 += '<h4>The group is '+women+' % women.</h4>'
htmlBuilder3 += '<p>Out of a total of 6 people, '+baseball+' reported that their favorite sport was baseball. '+basketball+' reported that their favorite sport was basketball. '+soccer+' reported that their favorite sport was soccer. '+footfall+ ' reported that their favorite sport was baseball. '+ unknown+' reported that their favorite sport was "unknown."</p>'
$('#data').html(htmlBuilder3);

buildChart();
};

function buildChart(){
   
      
      
      var genderChart = c3.generate({
        bindto: '#test2',
        data: {
          columns: [
            ['Female', femaleCount],
            ['Male', maleCount],
        ],
        title: 'Gender Chart',
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    }
});
    
    }
  function parseData2(data){
    var htmlBuilder2= "";
  
  var tempData = data["photo-gallery"];
   data = tempData.images.image;
   console.log(data);
   
   for (var i = 0; i <data.length; i++){
    var img = data[i]["image-path"];
    console.log(img);
    htmlBuilder2 += '<div class = "photoBox"><img class = "imgCar" src ='+img+'></div>'
  }

  //   }
 
 $('.responsive').html(htmlBuilder2);


 //   $('.responsive').html(htmlBuilder2);
    $('.responsive').slick({
      dots: false,
      prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i><</button>",
      nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i>></button>",
      infinite: true,
      speed: 300,
      slidesToShow: 1,
    
      responsive:[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    })
  };

  // }
