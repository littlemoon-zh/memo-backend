const on_success = (msg, status) => {
    const info = {
        'msg': msg,
        'status': status
    }
    return info
}


exports.on_success = on_success