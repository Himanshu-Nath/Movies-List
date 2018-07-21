describe('Dashboard factory', function () {
  var DashboardService;
  var rootScope;
  var $httpBackend;
  var errorResponse = { status: false, msg: "Error" };
  var movieList = {
    "page": {
      "title": "Romantic Comedy",
      "total-content-items": "54",
      "page-num-requested": "1",
      "page-size-requested": "20",
      "page-size-returned": "20",
      "content-items": {
        "content": [
          {
            "name": "The Birds",
            "poster-image": "poster1.jpg"
          },
          {
            "name": "Rear Window",
            "poster-image": "poster2.jpg"
          },
          {
            "name": "Family Pot",
            "poster-image": "poster3.jpg"
          },
          {
            "name": "Family Pot",
            "poster-image": "poster2.jpg"
          },
          {
            "name": "Rear Window",
            "poster-image": "poster1.jpg"
          },
          {
            "name": "The Birds",
            "poster-image": "poster3.jpg"
          },
          {
            "name": "Rear Window",
            "poster-image": "poster3.jpg"
          },
          {
            "name": "The Birds",
            "poster-image": "poster2.jpg"
          },
          {
            "name": "Family Pot",
            "poster-image": "poster1.jpg"
          },
          {
            "name": "The Birds",
            "poster-image": "poster1.jpg"
          },
          {
            "name": "The Birds",
            "poster-image": "poster1.jpg"
          },
          {
            "name": "Rear Window",
            "poster-image": "poster2.jpg"
          },
          {
            "name": "Family Pot",
            "poster-image": "poster3.jpg"
          },
          {
            "name": "Family Pot",
            "poster-image": "poster2.jpg"
          },
          {
            "name": "Rear Window",
            "poster-image": "poster1.jpg"
          },
          {
            "name": "The Birds",
            "poster-image": "poster3.jpg"
          },
          {
            "name": "Rear Window",
            "poster-image": "poster3.jpg"
          },
          {
            "name": "The Birds",
            "poster-image": "poster2.jpg"
          },
          {
            "name": "Family Pot",
            "poster-image": "poster1.jpg"
          },
          {
            "name": "The Birds",
            "poster-image": "poster1.jpg"
          }
        ]
      }
    }
  };



  beforeEach(angular.mock.module('moviesApp'));
  beforeEach(inject(function (_$rootScope_, _$httpBackend_, _DashboardService_) {
    DashboardService = _DashboardService_;
    rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should exist', function () {
    expect(DashboardService).toBeDefined();
  });

  describe('.getMoviesList()', function () {
    it('should exist', function () {
      expect(DashboardService.getMoviesList).toBeDefined();
    });

    it('should return a object of movies', function () {
      $httpBackend.expectGET('http://localhost:9876/assets/data/CONTENTLISTINGPAGE-PAGE1.json').respond(movieList);
      $httpBackend.expect('GET', 'app/components/dashboard/dashboard.view.html').respond(200);
      DashboardService.getMoviesList(1)
      .then(function (result) {
        expect(result).toBeDefined();
        $httpBackend.flush();
        expect(result.data).toEqual(movieList);
        done();
      });
    rootScope.$digest();
    });

    it('should return undefined if the movies cannot be found', function () {
      $httpBackend.expectGET('http://localhost:9876/assets/data/CONTENTLISTINGPAGE-PAGE4.json').respond(errorResponse);
      $httpBackend.expect('GET', 'app/components/dashboard/dashboard.view.html').respond(200);
      DashboardService.getMoviesList(4)
        .then(function (result) {
          expect(result).toBeDefined();
          $httpBackend.flush();
          expect(result.data).toEqual(errorResponse);
          done();
        });
      rootScope.$digest();
    });

  });
});