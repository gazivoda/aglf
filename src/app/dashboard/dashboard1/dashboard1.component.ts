import {Component} from '@angular/core';
import * as Chartist from 'chartist';
import {ChartEvent, ChartType} from "ng-chartist/dist/chartist.component";
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';
import {PlayersService} from 'app/aglf-services/players.service';
import {UserService} from 'app/aglf-services/user.service';
import {Player} from 'app/aglf-classes/player';
import {EndpointService} from '../../aglf-services/endpoint.service';
import {NGXToastrService} from './../../components/extra/toastr/toastr.service'

declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],
  providers: [NGXToastrService]
})

export class Dashboard1Component {

  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  players: Player[] = [];
  userDetails: any = {};
  topUsers: any[] = [];
  topPlayers: any[] = [];
  userProgress: any[] = [];
  lineArea2: Chart = {
    type: 'Line',
    data: {
      "labels": [],
      "series": [[]]
    },
    options: {
      showArea: true,
      fullWidth: true,
      lineSmooth: Chartist.Interpolation.none(),
      axisX: {
        showGrid: false,
      },
      axisY: {
        low: 0,
        scaleMinSpace: 50,
      }
    },
    responsiveOptions: [
      ['screen and (max-width: 640px) and (min-width: 381px)', {
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 2 === 0 ? value : null;
          }
        }
      }],
      ['screen and (max-width: 380px)', {
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 3 === 0 ? value : null;
          }
        }
      }]
    ],
  };

  constructor(private playersService: PlayersService,
              private userService: UserService,
              private endpointService: EndpointService,
              private toasterService: NGXToastrService) {
  }

  ngOnInit() {
    $.getScript('./assets/js/tour.js');
    $.getScript('./assets/js/hopscotch.min.js');
    this.userService.getUserDetails()
      .subscribe((data: any) => {
        this.userDetails = data;
        this.checkInfoMessages(data.players.length);
        this.endpointService.getProgressForUser(data.userId).subscribe((data: any) => {
          if (data && data.length > 0) {
            this.userProgress = data;
            this.lineArea2.data.series = this.getDataSeries(this.userProgress);
            this.lineArea2.data.labels = this.getDataLabels(this.userProgress);
          }
          else {
            this.endpointService.getProgressForUser(1).subscribe((data: any) => {
              this.userProgress = data;
              this.lineArea2.data.series[0] = this.getDataSeries(this.userProgress);
              this.lineArea2.data.labels = this.getDataLabels(this.userProgress);
            });
          }
        });
      });

    this.playersService.getPlayers()
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe((players: Player[]) => {
        this.players = players;
      });
    this.endpointService.getTopUsers().subscribe((data: any) => {
      this.topUsers = data;
    });
    this.endpointService.getTopPlayers().subscribe((data: any) => {
      this.topPlayers = data;
    });
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  checkInfoMessages(numberOfPlayers: number) {
    if (numberOfPlayers === 0) {
      this.toasterService.infoPlayersNumberZero();
    }
    if (numberOfPlayers < 11) {
      this.toasterService.infoPlayersNumberMoreThenZero();
    }
  }

  totalTeamCost(userDetails: any) {
    if (userDetails && userDetails.players && userDetails.players.length > 0) {
      return userDetails.players.map(player => player.price).reduce((a, c) => a + c);
    }
    return 0;
  }

  totalTeamCostByPlayer(players: any[]) {
    if (players && players.length > 0) {
      return players.map(player => player.price).reduce((a, c) => a + c);
    }
    return 0;
  }

  captainImage(players: any[]) {
    if (players && players.length > 0 && players.find(player => player.captain)) {
      return players.find(player => player.captain);
    }
    if (players.length > 0) {
      return players.find(player => player.jerseyUrl !== '');
    }
    return null;
  }

  getTeamRanking(topUsers: any[], userDetails: any) {
    return topUsers.indexOf(topUsers.find(user => user.userId === userDetails.userId)) + 1;
  }

  getDataLabels(userProgress: any[]) {
    if (userProgress && userProgress.length > 0) {
      return this.userProgress.map(up => 'Round ' + up['round']);
    }
    return []
  }

  getDataSeries(userProgress: any[]) {
    if (userProgress && userProgress.length > 0) {
      return this.userProgress.map(up => up.score);
    }
    return []
  }


  // Line area chart configuration Ends

  // Stacked Bar chart configuration Starts
  Stackbarchart: Chart = {
    type: 'Bar',
    data: data['Stackbarchart'],
    options: {
      stackBars: true,
      fullWidth: true,
      axisX: {
        showGrid: false,
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      chartPadding: 30
    },
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'linear',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 201, 255,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(17,228,183, 1)'
        });
      },
      draw(data: any): void {
        if (data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 5px',
            x1: data.x1 + 0.001
          });

        }
        else if (data.type === 'label') {
          data.element.attr({
            y: 270
          })
        }
      }
    },
  };
  // Stacked Bar chart configuration Ends

  // Line area chart 2 configuration Starts

  // Line area chart 2 configuration Ends

  // Line chart configuration Starts
  lineChart: Chart = {
    type: 'Line', data: data['LineDashboard'],
    options: {
      axisX: {
        showGrid: false
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        low: 0,
        high: 100,
        offset: 0,
      },
      fullWidth: true,
      offset: 0,
    },
    events: {
      draw(data: any): void {
        var circleRadius = 4;
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: circleRadius,
            class: 'ct-point-circle'
          });

          data.element.replace(circle);
        }
        else if (data.type === 'label') {
          // adjust label position for rotation
          const dX = data.width / 2 + (30 - data.width)
          data.element.attr({x: data.element.attr('x') - dX})
        }
      }
    },

  };
  // Line chart configuration Ends

  // Donut chart configuration Starts
  DonutChart: Chart = {
    type: 'Pie',
    data: data['donutDashboard'],
    options: {
      donut: true,
      startAngle: 0,
      labelInterpolationFnc: function (value) {
        var total = data['donutDashboard'].series.reduce(function (prev, series) {
          return prev + series.value;
        }, 0);
        return total + '%';
      }
    },
    events: {
      draw(data: any): void {
        if (data.type === 'label') {
          if (data.index === 0) {
            data.element.attr({
              dx: data.element.root().width() / 2,
              dy: data.element.root().height() / 2
            });
          } else {
            data.element.remove();
          }
        }

      }
    }
  };
  // Donut chart configuration Ends

  //  Bar chart configuration Starts
  BarChart: Chart = {
    type: 'Bar', data: data['DashboardBar'], options: {
      axisX: {
        showGrid: false,
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      low: 0,
      high: 60, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    },
    responsiveOptions: [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ],
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient4',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(238, 9, 121,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(255, 106, 0, 1)'
        });
        defs.elem('linearGradient', {
          id: 'gradient5',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 75, 145,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(120, 204, 55, 1)'
        });

        defs.elem('linearGradient', {
          id: 'gradient6',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(132, 60, 247,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(56, 184, 242, 1)'
        });
        defs.elem('linearGradient', {
          id: 'gradient7',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(155, 60, 183,1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(255, 57, 111, 1)'
        });

      },
      draw(data: any): void {
        var barHorizontalCenter, barVerticalCenter, label, value;
        if (data.type === 'bar') {

          data.element.attr({
            y1: 195,
            x1: data.x1 + 0.001
          });

        }
      }
    },

  };
  // Bar chart configuration Ends

  // line chart configuration Starts
  WidgetlineChart: Chart = {
    type: 'Line', data: data['WidgetlineChart'],
    options: {
      axisX: {
        showGrid: true,
        showLabel: false,
        offset: 0,
      },
      axisY: {
        showGrid: false,
        low: 40,
        showLabel: false,
        offset: 0,
      },
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      fullWidth: true,
    },
  };
  // Line chart configuration Ends

}
