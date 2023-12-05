// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js
$(window).on('load', function () {
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
            columnWidth: ".all"
        }
    })
});

// nice select
$(document).ready(function() {
    $('select').niceSelect();
  });

/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

const url = 'assets/the_district.json';
  
    // Function to fetch JSON data
    function fetchJSON(url) {
      return fetch(url).then(response => response.json());
    }
  
    // Function to initialize the categories dropdown
    async function initCategories() {
      const jsonData = await fetchJSON(url);
      const categoriesSelect = document.getElementById('categories');
  
      jsonData.categorie.forEach(category => {
        if (category.active.toLowerCase() === 'yes') {
          const option = document.createElement('option');
          option.value = category.id_categorie;
          option.text = category.libelle;
          categoriesSelect.appendChild(option);
        }
      });
    }
  
    // Function to update the list of dishes based on the selected category
    async function updatePlats() {
      const categoryId = document.getElementById('categories').value;
      const platsContainer = document.getElementById('platsContainer');
      const jsonData = await fetchJSON(url);
  
      // Filter dishes based on the selected category
      const filteredPlats = jsonData.plat.filter(plat => plat.id_categorie == categoryId);
  
      // Display dishes in the container
      platsContainer.innerHTML = '';
  
      filteredPlats.forEach(plat => {
        const platDiv = document.createElement('div');
        platDiv.innerHTML = `
          <h3>${plat.libelle}</h3>
          <p>${plat.description}</p>
          <p>Prix : ${plat.prix} €</p>
          <img src="images_the_district/food/${plat.image}" alt="${plat.libelle}">
        `;
        platsContainer.appendChild(platDiv);
      });
    }
  
    // Call the function to initialize categories when the page is ready
    document.addEventListener('DOMContentLoaded', function () {
      initCategories();
      document.getElementById('categories').addEventListener('change', updatePlats);
    });