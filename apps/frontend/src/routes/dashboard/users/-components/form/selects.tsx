import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { ItemsRoleEnum } from "@/lib/kubb/gen";
type Role = ItemsRoleEnum
interface RoleSelectProps {
  role?: Role | null;
  setRole: (role: Role) => void;
  disabled?: boolean;
}

export function RoleSelect({ role, setRole,disabled }: RoleSelectProps) {
  return (
    <Select disabled={disabled} value={role??"user"} onValueChange={setRole}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="user">User</SelectItem>
        <SelectItem value="suspended">Suspended</SelectItem>
      </SelectContent>
    </Select>
  );
}
