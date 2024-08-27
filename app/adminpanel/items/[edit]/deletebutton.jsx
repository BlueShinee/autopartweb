"use client"

import Swal from 'sweetalert2';

export default function DeleteButton({ deleteItem, record }) {
    return (
        <form id="deleteObjectFormData" className="py-1 px-4 flex justify-center items-center bg-red-500 text-white font-semibold rounded-md transition-all hover:bg-red-600">
            <button
                type="button"
                onClick={async () => {
                    const result = await Swal.fire({
                        title: "Are you sure?",
                        text: "Delete this image",
                        icon: "warning",
                    });

                    if (result.isConfirmed) {
                        try {
                            const form = document.getElementById('deleteObjectFormData')
                            const formData = new FormData(form)
                            deleteItem(formData)
                        } catch (err) {
                            console.error('Error deleting item:', err)
                        }
                    }
                }}
            > 
                Delete
            </button>
            <input type="text" value={record.id} name="itemid" className="hidden" />
        </form>
    )
}
