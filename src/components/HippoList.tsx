import { SpinnerCircular } from 'spinners-react';

import Image from "next/image";
import Link from "next/link";

const HippoRow = ({ id }: any) => {
    return (
        <Link href={`/hippo/${id}`}>
            <div
                className="bg-white rounded-md shadow-md text-black cursor-pointer"
            >
                <Image
                    className="rounded-t-md"
                    src={`/metadata/${id}.png`}
                    alt="Hippo #{id} picture"
                    height="200"
                    width="200"
                />
                <div className="p-2 text-center">{id}</div>
            </div>
        </Link>
    )
}

export const HippoList = ({ hippos, isLoading }: any) => {
    if (isLoading) return (
        <div className="max-w-screen-lg m-auto text-center mt-32">
            <SpinnerCircular className="m-auto" size={50} thickness={132} speed={100} color="rgba(86, 146, 256, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
        </div>
    )
    else return (
        <div className="grid grid-cols-5 gap-4 p-3 max-w-screen-lg m-auto">
            {hippos.map(hippo => {
                const hid = hippo.data.name.substring("happy hippo #".length)
                return (
                    <HippoRow key={hid} id={hid}></HippoRow>
                )
            })}
        </div>
    )
}  
