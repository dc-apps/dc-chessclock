import { Component, OnInit } from '@angular/core';

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
        this.matchSeconds = 300;
        this.matchIncrement = 3;
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
        this.reset(true);

        // start white timer
        this.whiteInterval = setInterval(() => {
            this.whiteTime--;
        }, 1000 / this.multiplier);
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
            this.whiteTime = this.matchSeconds * this.multiplier;
            this.blackTime = this.matchSeconds * this.multiplier;
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

    ngOnInit() { }
}