import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Radio({ label, options, selected, setSelected }) {

    return (
        <div>
            <RadioGroup value={selected} onChange={setSelected} className="mt-2">
                <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {options.map((option, index) => (
                        <RadioGroup.Option
                            key={option.name}
                            value={index}
                            className={({ active, checked }) =>
                                classNames(
                                    option.inStock ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                                    active ? 'ring-2 ring-primary ring-offset-2' : '',
                                    checked
                                        ? 'bg-primary text-background hover:bg-primaryhover'
                                        : 'ring-1 ring-inset ring-backgroundmuted bg-background text-text hover:bg-backgroundmuted',
                                    'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                                )
                            }
                            disabled={!option.inStock}
                        >
                            <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}
