export const BindMethod = (
	_target: any,
	_methodName: string | Symbol,
	descriptor: PropertyDescriptor
) => {
	const orgDescriptor = descriptor.value;
	const adjustedDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			const boundFn = orgDescriptor.bind(this);
			return boundFn;
		},
	};
	return adjustedDescriptor;
};
