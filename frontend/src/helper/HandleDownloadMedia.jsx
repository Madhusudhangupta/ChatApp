import axios from 'axios'
import { toast } from 'react-hot-toast'
import { SERVER_DOMAIN } from '../utils/Constants'

function saveMediaToDevice(blob, data) {
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.href = url
    link.download = data.CONTENT_NAME
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export async function handleDownloadMedia(data) {
    try {
        const response = await axios.get(
            `${SERVER_DOMAIN}/.download/${data.UNIQUE_NAME}`,
            {
                responseType: "blob",
                params: {
                    ROOM_CODE: data.ROOM_CODE,
                }
            }
        )
        // create a blob from the response data
        const blob = new Blob([response.data], {
            type: response.headers["content-type"]
        })
        // save media
        saveMediaToDevice(blob, data)

    } catch (error) {
        toast.error(error.message)
        console.log(`${error?.response?.data || error.message}`);
    }
}