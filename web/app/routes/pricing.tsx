import { MetaFunction } from "@remix-run/node";

import ComingSoon from "~/components/ComingSoon";
import getMetaTags from "~/utils/metaTags";

export const meta: MetaFunction = () => getMetaTags("pricing");

export default function Pricing() {
  return <ComingSoon />;
}
