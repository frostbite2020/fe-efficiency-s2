import { scan } from "react-scan";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import TanstackQueryLayout from "../integrations/tanstack-query/layout";

import TanstackQueryProvider from "../integrations/tanstack-query/provider";

export const Route = createRootRoute({
	component: RouteComponent,
});

function RouteComponent() {
	scan({
		enabled: true
	});

	return (
		<>
			<TanstackQueryProvider>

				<Outlet />
				<TanStackRouterDevtools />

				<TanstackQueryLayout />
			</TanstackQueryProvider>
		</>
	)
}
