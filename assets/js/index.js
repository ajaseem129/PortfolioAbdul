

portfolioFilters();
function portfolioFilters()
{
    console.log("Enter index.js")
    $.ajax({
        type: 'POST',
        url: "/home/filterList",
        dataType: "json",
        success: function(result) {
            console.log("Entered AJAX")
            console.log(result);
            $("#portfolio-flters").append(' <li data-filter="*" class="filter-active">All</li>')

            for(cat in result)
            {   
                var catname = Object.values(result[cat]);
                console.log(catname);
                
                $("#portfolio-flters").append('<li data-filter=".filter-'+catname+'">'+catname+'</li>')

            }

            fillProjects();


            
        }
    });
}
function fillProjects()
{
    $.ajax({
        type: 'POST',
        url: "/home/projectList",
        dataType: "json",
        success: function(result) {
            console.log("Entered AJAX")
            console.log(result);
            for(proj in result)
            {   
                var pName = (result[proj])['Title']
                var cat = (result[proj])['category'];
                var imgLink = (result[proj])['imgLink']
                var project = '<div class="col-lg-4 col-md-6 portfolio-item filter-'+cat+'"><div class="portfolio-wrap"><img src="/img/portfolio/'+imgLink+'" class="img-fluid" >'
                project+='<div class="portfolio-links"><a href="/home/portfolio-details/'+pName+'" title="More Details" class="bx bx-link"></a>'
                $('.portfolio-container').append(project)
            }


            
        }
    });
}