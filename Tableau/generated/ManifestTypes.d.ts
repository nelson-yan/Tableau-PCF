/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    source: ComponentFramework.PropertyTypes.StringProperty;
    clientId: ComponentFramework.PropertyTypes.StringProperty;
    secretId: ComponentFramework.PropertyTypes.StringProperty;
    secret: ComponentFramework.PropertyTypes.StringProperty;
    username: ComponentFramework.PropertyTypes.StringProperty;
    device: ComponentFramework.PropertyTypes.StringProperty;
    hidetabs: ComponentFramework.PropertyTypes.TwoOptionsProperty;
}
export interface IOutputs {
    source?: string;
    clientId?: string;
    secretId?: string;
    secret?: string;
    username?: string;
    device?: string;
    hidetabs?: boolean;
}
