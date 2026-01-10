"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { softDeleteAdmin } from "@/services/admin/adminsManagement";
// import { IAdmin } from "@/types/admin.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import AdminFormDialog from "./AdminFormDialog";
import { adminsColumns } from "./adminsColumn";
import AdminViewDetailDialog from "./AdminViewDetailDialog";
import { UserInfo } from "@/types/user.interface";

interface AdminsTableProps {
  admins: UserInfo[];
}

const AdminsTable = ({ admins }: AdminsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingAdmin, setDeletingAdmin] = useState<UserInfo | null>(null);
  const [viewingAdmin, setViewingAdmin] = useState<UserInfo | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<UserInfo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (admin: UserInfo) => {
    setViewingAdmin(admin);
  };

  const handleEdit = (admin: UserInfo) => {
    setEditingAdmin(admin);
  };

  const handleDelete = (admin: UserInfo) => {
    setDeletingAdmin(admin);
  };

  const confirmDelete = async () => {
    if (!deletingAdmin) return;

    setIsDeleting(true);
    const result = await softDeleteAdmin(deletingAdmin.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Admin deleted successfully");
      setDeletingAdmin(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete admin");
    }
  };

  return (
    <>
      <ManagementTable
        data={admins}
        columns={adminsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(admin) => admin.id!}
        emptyMessage="No admins found"
      />

      {/* Edit Admin Form Dialog */}
      <AdminFormDialog
        open={!!editingAdmin}
        onClose={() => setEditingAdmin(null)}
        admin={editingAdmin!}
        onSuccess={() => {
          setEditingAdmin(null);
          handleRefresh();
        }}
      />

      {/* View Admin Detail Dialog */}
      <AdminViewDetailDialog
        open={!!viewingAdmin}
        onClose={() => setViewingAdmin(null)}
        admin={viewingAdmin}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeletingAdmin(null)}
        onConfirm={confirmDelete}
        title="Delete Admin"
        description={`Are you sure you want to delete ${deletingAdmin?.fullName}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AdminsTable;
