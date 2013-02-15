///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>
///<reference path='../../lib/jquery/jquery-1.7.x-jqueryui-1.8.x.d.ts'/>

///<reference path='../abc/MediatorNames.ts'/>

///<reference path='../view/DemoMediator.ts'/>

///<reference path='../view/components/DemoComponent.ts'/>

/**
 * Configure and initialize view for the application.
 */
module DemoGame
{
	"use strict";

	export class PrepViewCommand
		extends puremvc.SimpleCommand
	{
		/**
		 * @override
		 */
		execute( note:puremvc.INotification )
		{
			var mainView:JQuery = note.getBody();

			/*
			 * View Components are initialized using the application main view selector
			 */
			var demoComponent:DemoComponent = new DemoComponent( mainView.find(".demoComponent") );

			/*
			 * Mediators initialization
			 */
			var demoMediator:puremvc.IMediator = new DemoMediator( MediatorNames.DEMO_MEDIATOR, demoComponent );

			/*
			 * PureMVC mediators registration
			 */
			this.facade.registerMediator( demoMediator );
		}
	}
}