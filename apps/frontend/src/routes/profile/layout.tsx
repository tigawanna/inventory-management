import { createFileRoute, Outlet } from '@tanstack/react-router'
import { GenericToolbar } from '../-components/GenericToolbar';

export const Route = createFileRoute('/profile')({
  component: ProfileLayout,
})

interface ProfileLayoutProps {

}

export function ProfileLayout({}:ProfileLayoutProps){
return (
 <div className='w-full min-h-screen'>
  <div className="sticky top-0">
    <GenericToolbar/>
  </div>
    <Outlet/>
 </div>
);
}
