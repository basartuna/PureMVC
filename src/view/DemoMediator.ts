///<reference path='../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='../abc/NotificationNames.ts'/>
///<reference path='../abc/ProxyNames.ts'/>
///<reference path='../model/DemoProxy.ts'/>
///<reference path='components/DemoComponent.ts'/>

/**
 * Role panel component <code>Mediator</code>.
 */
module DemoGame
{
	"use strict";

	export class DemoMediator
		extends puremvc.Mediator
	{
		/**
		 * A shortcut reference to the <code>RoleProxy</code>.
		 */
		private demoProxy:DemoProxy = null;

		/**
		 * Constructs a <code>RolePanelMediator</code> instance.
		 *
		 * @param name
		 * 		Name for this <code>Mediator</code>.
		 *
		 * @param viewComponent
		 * 		The <code>UserForm</code> view Component this <code>Mediator</code>	manage.
		 */
		constructor( name:string, viewComponent:DemoComponent )
		{
			super( name, demoComponent );

			this.registerListeners();
			this.demoProxy = <DemoProxy> /*</>*/ this.facade.retrieveProxy( ProxyNames.DEMO_PROXY );
		}

		/**
		 * Return the <code>RolePanel</code> view component this <code>Mediator</code> manage.
		 *
		 * @return
		 * 		The <code>RolePanel</code> view component this <code>Mediator</code> manage.
		 */
		private getDemoComponent():DemoComponent
		{
			return <DemoComponent>/*</>*/ this.viewComponent;
		}

		/**
		 * Register event listeners for the UserForm component.
		 */
		private registerListeners():void
		{
			var demoComponent:DemoComponent = this.getDemoComponent();			
			//rolePanel.addEventListener( RolePanel.REMOVE, this.onRemoveRole, this );
		}

		/**
		 * Unregister event listeners for the UserForm component.
		 */
		private unregisterListeners():void
		{
		    var demoComponent: DemoComponent = this.getDemoComponent();
			//rolePanel.removeEventListener( RolePanel.ADD, this.onAddRole, this );
			
		}

		/**
		 * @override
		 */
		listNotificationInterests():string[]
		{
			return [
				NotificationNames.DEMO_NOTIFICATION,
				NotificationNames.DEMO_COMMAND_FINISHED
			];
		}

		/**
		 * @override
		 */
		handleNotification( note:puremvc.INotification ):void
		{
			var demoComponent:DemoComponent = this.getDemoComponent();

			switch( note.getName() )
			{
			    case NotificationNames.DEMO_NOTIFICATION:
                    //
				break;

			    case NotificationNames.DEMO_COMMAND_FINISHED:
                    //
				break;

		}

		/**
		 * @override
		 *
		 * This will never be called during the demo but note that we well made the
		 * job of removing any listeners from the mediator and the component to
		 * make those instances ready for garbage collection.
		 */
		onRemove():void
		{
			//this.unregisterListeners();
			this.getDemoComponent().destroy();
		}
	}
}