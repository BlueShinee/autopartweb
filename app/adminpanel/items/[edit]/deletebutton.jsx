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
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3b56d1",
                        confirmButtonText: "Delete",
                        iconColor: '#f8bb86', // Custom color for the icon
                    });

                    if (result.isConfirmed) {
                        try {
                            const form = document.getElementById('deleteObjectFormData');
                            const formData = new FormData(form);
                            deleteItem(formData); // Pass the FormData object to deleteItem function
                        } catch (err) {
                            console.error('Error deleting item:', err);
                        }
                    }
                }}
            >
                Delete
            </button>
            <input type="text" value={record.id} name="itemid" className="hidden" />
        </form>
    );
}
