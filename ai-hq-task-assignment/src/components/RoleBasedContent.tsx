import { useRole } from '../contexts/RoleContext';
import { UserRole } from '../contexts/RoleContext';
import { ReactNode } from 'react';

/**
 * RoleBasedContent Component
 *
 * Conditionally renders content based on user role
 * Useful for showing/hiding features based on permissions
 *
 * @example
 * <RoleBasedContent roles={['hq', 'si', 'am']}>
 *   <StoreSelector />
 * </RoleBasedContent>
 *
 * @example
 * <RoleBasedContent roles={['store-manager']} fallback={<LockedMessage />}>
 *   <SingleStoreView />
 * </RoleBasedContent>
 */

interface RoleBasedContentProps {
  /** Roles that can see this content */
  roles: UserRole[];
  /** Content to show if role matches */
  children: ReactNode;
  /** Optional content to show if role doesn't match */
  fallback?: ReactNode;
}

export function RoleBasedContent({ roles, children, fallback = null }: RoleBasedContentProps) {
  const { profile } = useRole();

  if (roles.includes(profile.role)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
