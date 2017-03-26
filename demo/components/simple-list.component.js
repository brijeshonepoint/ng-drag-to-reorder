(function () {
  'use strict';

  angular.module('Demo')
    .component('simpleList', {
      template: `
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h4 class="panel-title">
              List of Avengers
              <span class="pull-right">
                Draggable:
                <span class="label label-success" ng-if="$ctrl.draggable">ON</span>
                <span class="label label-danger" ng-if="!$ctrl.draggable">OFF</span>
              </span>
            </h4>
          </div>
          <div class="panel-body">
            <ul class="list-group" drag-to-reorder="$ctrl.avengers">
              <li class="list-group-item" ng-repeat="avenger in $ctrl.avengers" 
              dtr-draggable dtr-event="avengerDropped" dtr-init="{{$ctrl.draggable}}">
                <span ng-bind="avenger.rank"></span>
                <span ng-bind="avenger.name"></span>
              </li>
            </ul>
          </div>
          <div class="panel-footer">
            <div class="row">
              <div class="col-sm-7">
                <div class="input-group">
                  <input type="text" ng-model="$ctrl.character" class="form-control" placeholder="Add Marvel character..." ng-keyup="$ctrl.keyup($event)">
                  <span class="input-group-btn">
                    <button class="btn btn-primary" type="button" ng-click="$ctrl.add()">Add</button>
                  </span>
                </div>
              </div>
              <div class="col-sm-5 text-right">
                <button class="btn btn-success" ng-click="$ctrl.toggleDrag()">Toggle Drag n Drop</button>
              </div>
            </div>
          </div>
        </div>
            `,
      controller: listController
    });

  /* @ngInject */
  function listController(ngDragToReorder, $scope) {
    this.isSupported = ngDragToReorder.isSupported();
    this.draggable = false;
    this.character = '';
    this.avengers = [
      {rank: 1, name: 'Thor'},
      {rank: 2, name: 'Spider Man'},
      {rank: 3, name: 'Captain America'},
      {rank: 4, name: 'Hulk'},
      {rank: 5, name: 'Iron Man'},
      {rank: 6, name: 'Black Widow'},
      {rank: 7, name: 'Ant Man'},
      {rank: 8, name: 'Luke Cage'},
      {rank: 9, name: 'Beast'},
      {rank: 10, name: 'Wolverine'}
    ];

    this.toggleDrag = () => this.draggable = !this.draggable;

    $scope.$on('dragToReorder.avengerDropped', (e, data) => {
      console.log('dragToReorder.avengerDropped', data);
      this.avengers = data.list.map((avenger, i) => {
        avenger.rank = i + 1;
        return avenger;
      });
    });

    this.keyup = e => {
      if (e.keyCode === 13) this.add();
    };

    this.add = () => {
      if (this.character) {
        let newAvenger = {
          rank: this.avengers.length + 1,
          name: this.character
        };
        this.avengers.push(newAvenger);
        console.log('adding new avenger:', newAvenger);
        this.character = '';
      }
    }

  }
})();
