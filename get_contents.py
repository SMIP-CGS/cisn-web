#!/usr/bin/env python

import sys
import pathlib
import argparse
from libcomcat.search import get_event_by_id


def main(args):
    detail = get_event_by_id(args.eventid)
    if 'shakemap' not in detail.products:
        print(f'No shakemap exists for event {args.eventid}. Exiting.')
        sys.exit(1)

    outdir_p = pathlib.Path(args.outdir)
    if not outdir_p.exists():
        outdir_p.mkdir(parents=True)
    products = detail.getProducts(args.product, source=args.source)
    if not len(products):
        print(f'No shakemap found for source {args.source}. Exiting.')
        sys.exit(1)

    product = products[0]
    eventdir = outdir_p / args.eventid / args.product
    if not eventdir.exists():
        eventdir.mkdir(parents=True)
    nfiles = 0
    for content in product.contents:
        fname = content.replace('/', pathlib.os.sep)
        outfile = eventdir / fname
        fdir = outfile.parent
        if not fdir.exists():
            fdir.mkdir(parents=True)
        print(f'Downloading {content}...')
        product.getContent(content, outfile)
        nfiles += 1

    print(f'Downloaded {nfiles} files to {eventdir}.')


if __name__ == '__main__':
    desc = '''Download all contents for given event/product combination.
    
    Sample Usage:
    get_contents.py /home/username/data shakemap nn00757297 --source 'us'

    This will create a directory /home/username/data/nn00757297/shakemap

    where all of the contents from the 'us' ShakeMap will be stored.
    '''
    fmt = argparse.RawDescriptionHelpFormatter
    parser = argparse.ArgumentParser(description=desc,
                                     formatter_class=fmt)

    ohelp = 'Top level directory where data will be written'
    parser.add_argument('outdir', help=ohelp)

    phelp = 'Name of ComCat product from which to download contents.'
    parser.add_argument('product', help=phelp)

    ehelp = 'Name of ComCat event ID.'
    parser.add_argument('eventid', help=ehelp)

    shelp = 'Name of desired product source.'
    parser.add_argument('-s', '--source', help=shelp,
                        default='preferred')
    pargs = parser.parse_args()
    main(pargs)
