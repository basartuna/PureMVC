///<reference path='../../../lib/puremvc/puremvc-typescript-standard-1.0.d.ts'/>

/**
 * A base class used for UI components of the application.
 *
 * It mainly adds a basic UiComponent implementation to make UI components listenable from the
 * <code>Mediator</code>s. Here to simplify the demo we don't use a real <code>Event</code> class.
 * Implementers and listeners are responsible for the anonymous events object they dispatch and
 * receive.
 */
module DemoGame {
    "use strict";

    export class UiComponent {
        /**
		 * Constructs a <code>UiComponent</code> instance.
		 */
        constructor() {
            this.listenerMap = {}
        }

        /**
		 * A map of <code>ListenerDescriptor</code> objects.
		 */
        private listenerMap: Object = null;

        /**
		 * Dispatches an event into the event flow.
		 *
		 * @param type
		 * 		The type of the event to dispatch.
		 *
		 * @param properties
		 *		An anonymous object to send to listeners of the event when it is dispatched.
		 *
		 * @protected
		 */
        dispatchEvent(type: string, properties: any = null): void {
            if (typeof type == 'undefined')
                return;

            if (typeof this.listenerMap[UiComponent.QUEUE_PATTERN + type] == 'undefined')
                return;

            var queue: ListenerDescriptor[] = this.listenerMap[UiComponent.QUEUE_PATTERN + type].slice(0);

            var len: number = queue.length;
            for (var i: number = 0; i < len; i++) {
                var listenerDescriptor: ListenerDescriptor = queue[i];

                if (typeof listenerDescriptor.context != "undefined")
                    listenerDescriptor.listener.call(listenerDescriptor.context, type, properties);
                else
                    listenerDescriptor.listener.call(this, type, properties);
            }
        }

        /**
		 * Add an event listener so that the listener receives notification of an event.
		 *
		 * @param type
		 * 		Type of the event to add.
		 *
		 * @param listener
		 * 		The listener method of the event to add.
		 *
		 * @param context
		 * 		The context attached for the listener method of the event to add.
		 *
		 * @protected
		 */
        addEventListener
		(
            type: string,
            listener: (type: string, properties: any) => void ,
            context: any = null
		): void {
            if (typeof type == "undefined")
                return;

            if (typeof listener != 'function')
                return;

            var newListener: ListenerDescriptor = new ListenerDescriptor(listener, context);

            var queue: ListenerDescriptor[];
            if (typeof this.listenerMap[UiComponent.QUEUE_PATTERN + type] == "undefined")
                queue = this.listenerMap[UiComponent.QUEUE_PATTERN + type] = [];
            else
                queue = this.listenerMap[UiComponent.QUEUE_PATTERN + type];

            var len: number = queue.length;
            for (var i: number = 0; i < len; i++) {
                var listenerDescriptor: ListenerDescriptor = queue[i];
                if (listenerDescriptor.equals(newListener))
                    return;
            }

            queue.push(newListener);
        }

        /**
		 * Remove an event listener so that the listener stops receiving notification
		 * of an event.
		 *
		 * @param type
		 * 		Type of the event to remove.
		 *
		 * @param listener
		 * 		The listener method of the event to remove.
		 *
		 * @param context
		 * 		The context attached for the listener method of the event to remove.
		 *
		 * @protected
		 */
        removeEventListener
		(
            type: string,
            listener: (type: string, properties: any) => void ,
            context: any = null
		): void {
            if (typeof type == "undefined")
                return;

            if (typeof listener == "undefined")
                return;

            if (typeof this.listenerMap[UiComponent.QUEUE_PATTERN + type] == "undefined")
                return;

            var queue: ListenerDescriptor[] = this.listenerMap[UiComponent.QUEUE_PATTERN + type];
            var len: number = queue.length;
            for (var i: number = 0; i < len; i++) {
                var listenerDescriptor: ListenerDescriptor = queue[i];
                if (listenerDescriptor.equals(new ListenerDescriptor(listener, context))) {
                    queue.splice(i, 1);
                    return;
                }
            }
        }

        /**
		 * Remove any references used by the component to help garbage collection.
		 */
        destroy(): void {
            this.listenerMap = {};
        }

        /**
		 * A prefix used on map item names to prevent name conflicts.
		 *
		 * @type {string}
		 * @constant
		 */
        private static QUEUE_PATTERN: string = '@_@';
    }

    /**
	 * Private class (this is what TypeScript compile today we better have to say) defining a
	 * descriptor object used by the <code>listenerMap</code> to identify each event listener.
	 */
    class ListenerDescriptor {
        /**
		 * The listener method to call.
		 */
        listener: Function;

        /**
		 * The listener context with which to call the method.
		 */
        context: any;

        /**
		 * Constructs a <code>ListenerDescriptor</code> instance.
		 *
		 * @param listener
		 * 		The listener method to call.
		 *
		 * @param context
		 * 		The listener context on which to call the method.
		 */
        constructor(listener: Function, context: any) {
            this.listener = listener;
            this.context = context;
        }

        /**
		 * Compare two <code>ListenerDescriptor</code>s to determine if they target the exact
		 * same event listener.
		 *
		 * @param compared
		 * 		The descriptor that will be compared to the current.
		 *
		 * @return
		 * 		The two compared listeners are equals.
		 */
        equals(compared: ListenerDescriptor): bool {
            if (compared.listener === this.listener) {
                if (typeof compared.context != "undefined") {
                    if (compared.context == null && this.context == null)
                        return true;

                    if (compared.context === this.context)
                        return true;
                }
            }

            return false;
        }
    }
}