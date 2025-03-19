"use client";
import { useEffect } from "react";
import "./globals.css";

export default function SalesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useEffect(() => {
		if (typeof window !== "undefined") {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.id = "zsiqscript";
			script.defer = true;
			script.src = "https://salesiq.zohopublic.com/widget";

			document.body.appendChild(script);

			const widgetScript = document.createElement("script");
			widgetScript.type = "text/javascript";
			widgetScript.id = "zsiqchat";
			widgetScript.innerHTML = `
        var $zoho = $zoho || {};
        $zoho.salesiq = $zoho.salesiq || {
          widgetcode: "siqf496fa49c70a3de67a85f0e3ceb80621fa911025996d633d43e5e232cada29ac",
          values: {},
          ready: function () {}
        };
      `;
			document.body.appendChild(widgetScript);
		}
	}, []);

	return <>{children}</>;
}
