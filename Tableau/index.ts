import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { TableauViz, TableauEventType } from "./tableau.embedding.3.1.0.min";
import handler from "./SignJWT";

export class Tableau implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    // PCF framework delegate that will be assigned to this object that would be called whenever any update happens. 
    //private _notifyOutputChanged: () => void;

    private _token: string;

    // Reference to the control container HTMLDivElement
    private _container: HTMLDivElement;

    // Flag if tableau viz parameters have been chagned
    private _controlParamChanged: boolean;

    private _viz = new TableauViz();

    private _username: string;
    private _clientId: string;
    private _secretId: string;
    private _secret: string;
    private _source: string;
    private _device: string;
    private _hidetabs: boolean;
    //private _iat: Date;
    //private _exp: Date;


    /**
     * Empty constructor.
     */
    constructor() {
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        // Add control initialization code
        console.log("--- initTriggered! ---");

        this._container = container;

        //this.renderTableauViz(context);
        this._viz.height = "100%";
        this._viz.width = "100%";
        this._viz.setAttribute("id", "tableauViz");
        
        this._container.appendChild(this._viz);
        //this._notifyOutputChanged = notifyOutputChanged;
        this._controlParamChanged = false;
        context.mode.trackContainerResize(true);
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
        console.log("--- udpateViewTriggered! ---");

        console.log(context.updatedProperties);


        this._controlParamChanged = this._username !== context.parameters.username.raw && !!context.parameters.username.raw ||
            this._clientId !== context.parameters.clientId.raw && !!context.parameters.clientId.raw ||
            this._secret !== context.parameters.secret.raw && !!context.parameters.secret.raw ||
            this._secretId !== context.parameters.secretId.raw && !!context.parameters.secretId.raw ||
            this._source !== context.parameters.source.raw && !!context.parameters.source.raw ||
            this._device !== context.parameters.device.raw && !!context.parameters.device.raw ||
            this._hidetabs !== context.parameters.hidetabs.raw;

        if (this._controlParamChanged) {

            console.log("controlParamChanged: " + this._controlParamChanged);

            this.renderTableauViz(context)
        }

        this._container.style.height = `${context.mode.allocatedHeight}px`;
        this._container.style.width = `${context.mode.allocatedWidth}px`;
    }


    private renderTableauViz(context: ComponentFramework.Context<IInputs>): void {

        if(context.parameters.username.raw !=="" && context.parameters.clientId.raw !=="" && context.parameters.secret.raw!=="" && 
        context.parameters.secretId.raw !==""&& context.parameters.source.raw !==""&& context.parameters.device.raw !==""){

            console.log("--- Token refreshed! ---");

            this._username = context.parameters.username.raw || "";
            this._clientId = context.parameters.clientId.raw || "";
            this._secret = context.parameters.secret.raw || "";
            this._secretId = context.parameters.secretId.raw || "";
            this._source = context.parameters.source.raw || "";
            this._device = context.parameters.device.raw || "";
            this._hidetabs = context.parameters.hidetabs.raw;


            this._viz.src = this._source;
            this._viz.device = this._device;
            this._viz.toolbar = "hidden";

            this._hidetabs ? this._viz.setAttribute("hide-tabs", this._hidetabs) : this._viz.removeAttribute('hide-tabs');
            
            handler(this._clientId, this._username, this._secret, this._secretId).then((res) => {
                this._token = res.token;
                //this._iat = res.iat;//token issued at
                //this._exp = res.exp;//token expired at
    
                this._viz.token = this._token;
                console.log("token: " + this._token);
                // this._notifyOutputChanged();
            });
        }
    }


    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {
            // token: this._token ?? undefined
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
