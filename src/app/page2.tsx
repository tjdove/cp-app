import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";


export default function ExampleForm() {
return (
<form>
<h2 className="text-lg font-semibold mb-4">Manage Account</h2>
{/* Primary Button */}
<Button>Save Changes</Button>
{/* Secondary Button */}
<Button variant="secondary">Cancel</Button>
{/* Destructive Button */}
<Button variant="destructive" className="ml-2">
<Trash className="mr-2" />
Delete Account
</Button>
{/* Link Button */}
<Button as="a" href="/help" variant="link" className="ml-2">
Help
</Button>
{/* Button with Icon */}
<Button  className="ml-2">
<Plus className="mr-2" />
Add Item
</Button>
{/* Loading Button */}
<Button disabled className="ml-2">
<span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
Processing
</Button>
</form>
);
}