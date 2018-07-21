angular.module('moviesApp')
  .controller('DashboardController', ['$state', '$rootScope', 'DashboardService', '$scope', '$window',
    function ($state, $rootScope, DashboardService, $scope, $window) {

      var vm = this;
      vm.pageInfo = {};
      vm.movies = [];
      getMovieList();

      $scope.loadMore = function () {
        console.log("hi");
      }

      angular.element($window).bind("scroll", function () {
        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body, html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
          getMovieList(Number(vm.pageInfo.currentPage) + 1);
        }
      });

      function getMovieList(pageNumber) {
        pageNumber = pageNumber == undefined ? 1 : pageNumber;
        DashboardService.getMoviesList(pageNumber)
          .then(function (response) {
            console.log(response);
            if (response != undefined && response.status != false) {
              for (let movie of response.page['content-items'].content) {
                vm.movies.push(movie)
              }
              vm.title = response.page.title;
              vm.pageInfo.currentPage = response.page['page-num-requested'];
              vm.pageInfo.totalItems = response.page['total-content-items'];
            } else {
              const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
              });
              
              toast({
                type: 'success',
                title: 'All data fetched'
              })
            }
          },
          function (error) {
            const toast = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            });
            
            toast({
              type: 'success',
              title: 'All data fetched'
            })
          });
      }

    }
  ]);