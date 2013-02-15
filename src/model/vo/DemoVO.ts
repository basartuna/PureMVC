///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>
/**
 * The value object in charge of transporting the data to describe each user roles.
 */
module DemoGame
{
	"use strict";

	export class DemoVO
	{
	    private item1: string;
        private item2: string;
        
        constructor() {

            this.item1 = "ITEM 1";
            this.item2 = "ITEM 2";

        }

        setItem1(str: string): void {
            this.item1 = str;
        }

        setItem2(str: string): void {
            this.item2 = str;
        }

        getItem1(): string {
            return this.item1;
        }

        getItem2(): string {
            return this.item2;
        }

	}
}