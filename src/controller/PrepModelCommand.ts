///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='../abc/ProxyNames.ts'/>
///<reference path='../model/vo/DemoVO.ts'/>
///<reference path='../model/DemoProxy.ts'/>

/**
 * Configure and initialize model for the application.
 */
module DemoGame
{
	"use strict";

	export class PrepModelCommand
		extends puremvc.SimpleCommand
	{
		/**
		 * @override
		 */
		execute( note:puremvc.INotification ):void
		{
			/*
			 * Data initialization.
			 */
			var demoProxy:puremvc.IProxy = new DemoProxy( ProxyNames.DEMO_PROXY, this.generateData() );

			/*
			 * Proxies initialization.
			 */
			this.facade.registerProxy( demoProxy );
		}

		generateData():DemoVO
		{

            var vo: DemoVO = new DemoVO();

            vo.setItem1("set 1");
            vo.setItem2("set 2");
                             
			return vo;
		}
	}
}