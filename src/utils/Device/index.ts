export interface devicesInterface {
    name: string
    key: string
    resolution: {
        width: number,
        heigth: number
    }
}

export const Devices: devicesInterface[] = [
    {
        name: "Desktop", key: "desktop", resolution: {
            width: 1366,
            heigth: 768
        }
    },
    {
        name: "Tablet", key: "tablet", resolution: {
            width: 768,
            heigth: 957
        }
    },
    {
        name: "Mobile", key: "mobile", resolution: {
            width: 360,
            heigth: 670
        }
    },
]