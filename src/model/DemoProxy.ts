///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='vo/DemoVO.ts'/>

/**
 * PureMVC <code>Proxy</code> class object used to control the user roles list of the application.
 */
module DemoGame
{
	"use strict";

	export class DemoProxy
		extends puremvc.Proxy
		{

	    demoVO: DemoVO;

	    constructor() {
	        super();
	        this.demoVO = new DemoVO();
	    }

	    getItem1(): String {

	        return this.demoVO.getItem1();
	    }

	    getItem2(): String {

	        return this.demoVO.getItem2();
	    }

	}
}