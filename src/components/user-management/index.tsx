
import {
  createSupabaseAdminClient,
} from "@/lib/supabase/server";
import DealerList from "./dealer-list";
import Search from "./search";


interface UserManagementPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function UserManagement({
  searchParams,
}: UserManagementPageProps) {
  
  
  const supabaseAdmin = await createSupabaseAdminClient(); 

  const searchQuery = searchParams?.query as string || '';

  const page = parseInt(searchParams?.page as string) || 0; 
  const pageSize = parseInt(searchParams?.pageSize as string) || 10;

  // Supabase query 
  const from = page * pageSize;
  const to = from + pageSize - 1;


  let query = supabaseAdmin
    .from("profiles")
    .select("*", { count: "exact" }) 
    .order("created_at", { ascending: false });

  if (searchQuery) {
    query = query
      .ilike("full_name", `%${searchQuery}%`)
      .or(`username.ilike.%${searchQuery}%, email.ilike.%${searchQuery}%`);
  }

  query = query.range(from, to);

  const { data: users, error: fetchError, count: totalCount } = await query; 

  if (fetchError) {
    console.error("Error fetching users for admin panel:", fetchError);
    return (
      <div className="text-red-500 text-center p-8">
        Error loading user data: {fetchError.message}. Please check logs.
      </div>
    );
  }

 
  const rows = users || []; 

  return (
    <div className="flex flex-col gap-5 h-full">
      <p className="font-fredoka font-semibold text-[32px] text-[#1C1C1C] ">
        List of Dealers
      </p>
    
      <Search initialSearch={searchQuery} />
      <div className="flex-1">
        <DealerList
          rows={rows}
          totalCount={totalCount || 0}
          initialPage={page}
          initialPageSize={pageSize}
        />
      </div>
    </div>
  );
}