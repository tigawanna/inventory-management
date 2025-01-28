import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
type Role = "admin" | "user";
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
      </SelectContent>
    </Select>
  );
}
