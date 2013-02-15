///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='../abc/NotificationNames.ts'/>
///<reference path='../abc/ProxyNames.ts'/>

///<reference path='../model/vo/DemoVO.ts'/>
///<reference path='../model/DemoProxy.ts'/>

/**
 * Command used to delete a user from the main users list.
 */
module DemoGame
{
	"use strict";

	export class DemoCommand
		extends puremvc.SimpleCommand
	{
		/**
		 * @override
		 */
		execute( note:puremvc.INotification ):void
		{
			var vo:DemoVO = note.getBody();
			var demoProxy:DemoProxy = <DemoProxy> /*</>*/ this.facade.retrieveProxy( ProxyNames.DEMO_PROXY );
		
			console.log("In the demo command... " + demoProxy.getItem1());

			this.sendNotification( NotificationNames.DEMO_COMMAND_FINISHED );
		}
	}
}