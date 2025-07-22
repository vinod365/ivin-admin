import UserManagement from "@/components/user-management";
interface DealersPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ query: string }>;
}

export default async function page({ searchParams }: DealersPageProps) {
  const params = await searchParams;
  return <UserManagement searchParams={params}/>;
}
