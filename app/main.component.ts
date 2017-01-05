import { Component, OnInit } from '@angular/core';
import dialogs = require('ui/dialogs');

@Component({
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
    private matchSeconds: number;
    private matchIncrement: number;

    private multiplier: number;

    private whiteTime: number;
    private blackTime: number;
    private whiteInterval: any;
    private blackInterval: any;

    public sides: Array<string>;

    constructor() {
        this.matchSeconds = 900;
        this.matchIncrement = 10;
        this.multiplier = 10;

        this.whiteTime = this.matchSeconds * this.multiplier;
        this.blackTime = this.matchSeconds * this.multiplier;
        this.sides = ['left', 'right'];
    }

    public getTime(color): Array<any> {
        let totalSeconds = Math.ceil(this[color + 'Time'] / this.multiplier);

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds - (minutes * 60);
        let timeString = minutes + ':' + seconds;

        if (totalSeconds < 1) {
            this.timeout(color);
        }

        return [timeString, totalSeconds];
    }

    public startClock() {
        if (this.whiteInterval == 'pause') {
            // start white timer
            this.whiteInterval = setInterval(() => {
                this.whiteTime--;
            }, 1000 / this.multiplier);
            return;
        }

        if (this.blackInterval == 'pause') {
            // start black timer
            this.blackInterval = setInterval(() => {
                this.blackTime--;
            }, 1000 / this.multiplier);
            return;
        }

        this.reset();

        // start white timer
        this.whiteInterval = setInterval(() => {
            this.whiteTime--;
        }, 1000 / this.multiplier);
    }

    public pauseClock() {
        if (this.whiteInterval) {
            clearInterval(this.whiteInterval);
            this.whiteInterval = 'pause';
        }
        if (this.blackInterval) {
            clearInterval(this.blackInterval);
            this.blackInterval = 'pause';
        }
    }

    public switchSides() {
        this.sides.reverse();
    }

    public reset(resetTime = false) {
        clearInterval(this.whiteInterval);
        clearInterval(this.blackInterval);
        this.whiteInterval = null;
        this.blackInterval = null;

        if (resetTime) {
            dialogs.action({
                message: 'Choose time control',
                cancelButtonText: 'Cancel',
                actions: ['Rapid', 'Blitz']
            }).then(result => {
                if (result == 'Rapid') {
                    this.matchSeconds = 900;
                    this.matchIncrement = 10;
                }
                if (result == 'Blitz') {
                    this.matchSeconds = 180;
                    this.matchIncrement = 2;
                }

                this.whiteTime = this.matchSeconds * this.multiplier;
                this.blackTime = this.matchSeconds * this.multiplier;
            });


        }
    }

    private timeout(color) {
        alert(color + ' is out of time!');
        this.reset();
    }

    public tap(white) {
        // clear intervals first
        this.reset();

        if (white) {
            this.whiteTime += this.matchIncrement * this.multiplier;
            // start black timer
            this.blackInterval = setInterval(() => {
                this.blackTime--;
            }, 1000 / this.multiplier);
        }
        else {
            this.blackTime += this.matchIncrement * this.multiplier;
            // start white timer
            this.whiteInterval = setInterval(() => {
                this.whiteTime--;
            }, 1000 / this.multiplier);
        }
    }

    get clockRunning() {
        if ((this.whiteInterval == 'pause') || this.blackInterval == 'pause') {
            return false;
        }
        else if (this.whiteInterval || this.blackInterval) {
            return true;
        }
        else {
            return false;
        }
    }

    ngOnInit() { }
}