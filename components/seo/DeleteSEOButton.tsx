"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { deleteSEOArticle } from "../../src/actions/seo";

export default function DeleteSEOButton({
id,
}: {
id: number;
}) {
const router = useRouter();

async function handleDelete() {
if (
!confirm(
"Bạn chắc chắn muốn xóa?"
)
) {
return;
}

await deleteSEOArticle(id);

toast.success(
  "Đã xóa bài viết"
);

router.refresh();

}

return ( <button
   onClick={handleDelete}
   className="px-3 py-1 rounded bg-red-600 text-white"
 >
Xóa </button>
);
}
