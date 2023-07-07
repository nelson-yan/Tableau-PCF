# Tableau PCF

PowerApps has native support for embedding Power BI reports and dashboards. However, if your organization uses both Tableau and PowerApps, embedding Tableau dashboards can be a challenge since it is not natively supported.

Follow below steps to use the Tableau PCF component to seamlessly embed a Tableau dashboard within PowerApps without requiring users to log in ([Connected App Method](https://help.tableau.com/current/online/en-us/connected_apps_direct.htm)).

![image](https://user-images.githubusercontent.com/66454128/226165825-af736dc1-3d66-4f22-a995-db71d67eb249.png)

## Prerequisites

- Code component feature is enabled in your PowerApps environment. [🔗](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/component-framework-for-canvas-apps#enable-the-power-apps-component-framework-feature)
- Tableau component solution [🔗](https://github.com/nelson-yan/Tableau-PCF/releases/tag/v1.0.0)
- Tableau Site Admin Role or higher
- Tableau 22.1 version or later, for Connected App UI
- Or Tableau 21.4 version or later, for [Connected App API](https://help.tableau.com/v2021.4/api/rest_api/en-us/REST/rest_api_ref_connected_app.htm)

## Install Tableau component

To get started, download the Tableau component managed solution from GitHub and import it into your PowerApps environment. Then, create a blank Canvas App and import the Tableau component into your app. After Tableau compoent is added into canvas, and you’ll find some properties under Properties tab awaiting you to configure from tableau.

![image](https://user-images.githubusercontent.com/66454128/226165513-2376e31c-d70e-45ef-9409-d4d7b6460391.png)

## Configure Connected App in Tableau

Refer to [Create a connected app](https://help.tableau.com/current/online/en-us/connected_apps_direct.htm#create-a-connected-app)

![image](https://user-images.githubusercontent.com/66454128/226165734-a17ee570-263e-4dc1-8209-b90582c71535.png)

## Get Tableau dashboard embedded link

Open the dashboard view you’d like to embed in PowerApps, click ‘Share‘ button to open the share view and click ‘Copy Link‘ button to get the dashboard link.

![image](https://user-images.githubusercontent.com/66454128/226165784-a6f5dbb6-6db6-4e53-99a7-7f48626e4ed7.png)

## Complete the final configurations

Once the Tableau configurations are complete, return back to your Canvas App, paste dashboard link into Source property, and Client Id, Secret Id, Secret Value from Tableau Connected App page, into ClientId, SecretId and Secret properties. Enter your tableau account name into Username property, and “Destkop” into Device property.

The Tableau componet will start redenering for few seconds, and then here we go!! ✨✨✨

![image](https://user-images.githubusercontent.com/66454128/226165825-af736dc1-3d66-4f22-a995-db71d67eb249.png)


